import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import CrudsConsumerService from 'modules/api.mobile/v1/consumer/consumer.service';
import { User, UserMapping } from 'modules/entities';
import { FirebaseMessagingService } from 'modules/firebase';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import { UsersService } from 'modules/user';
import { UserMappingService } from './userMapping.service';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { Roles } from 'modules/common/constants/roles';

@ApiBearerAuth()
@Crud({
  model: {
    type: UserMapping,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
  params: {
    id: {
      primary: true,
      type: 'number',
      field: 'id',
    },
  },
  query: {
    join: {
      user: {
        eager: true,
        alias: 'user',
        exclude: ['password'],
      },
      provider: {
        eager: true,
        alias: 'provider',
      },
      consumer: {
        eager: true,
        alias: 'consumer',
      },
    },
  },
})
@Controller('api/user-mapping')
@ApiTags('userMapping')
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class UserMappingController implements CrudController<UserMapping> {
  constructor(
    public readonly service: UserMappingService,
    public readonly providerService: CrudsProviderService,
    public readonly consumerService: CrudsConsumerService,
    public readonly userService: UsersService,
    private firebaseMessage: FirebaseMessagingService,
  ) {}

  get base(): CrudController<UserMapping> {
    return this;
  }

  @Get('/byProvider')
  async getUserMappingsByProvider(
    @ParsedRequest() req: CrudRequest,
    @Query() query,
  ) {
    const { providerId, userKey } = query;
    const provider = await this.providerService.findOne({
      providerCode: providerId,
      status: 'ACTIVE',
    });
    if (!provider) {
      throw new BadRequestException('Provider not found');
    }
    const userMappings = await this.service.find({
      where: {
        providerId: provider.id,
        mappingStatus: 'ACTIVE',
        key: userKey,
      },
      join: {
        alias: 'userMapping',
        leftJoinAndSelect: {
          consumer: 'userMapping.consumer',
        },
      },
    });
    return userMappings;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserMapping,
  ) {
    const providerData = await this.providerService.findOne({
      id: dto.providerId,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    const consumerData = await this.consumerService.findOne({
      id: dto.consumerId,
    });
    if (!consumerData || !consumerData.id) {
      throw new BadRequestException('consumer not found');
    }
    const userData = await this.userService.findOne({
      id: dto.userId,
    });
    if (!userData || !userData.id) {
      throw new BadRequestException('user not found');
    }
    return this.base.createOneBase(req, {
      ...dto,
    } as UserMapping);
  }

  @Patch('multi')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUserMappingsByUserId(
    @Body() payload: Partial<UserMapping>,
    @Query('user_id') user_id,
  ): Promise<any> {
    return this.service.updateUserMappings(payload, { userId: user_id });
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserMapping,
    @Param('id') id,
  ) {
    if (dto.providerId) {
      const providerData = await this.providerService.findOne({
        id: dto.providerId,
      });
      if (!providerData || !providerData.id) {
        throw new BadRequestException('Provider not found');
      } else {
        dto.provider = providerData;
      }
    }
    if (dto.consumerId) {
      const consumerData = await this.consumerService.findOne({
        id: dto.consumerId,
      });
      if (!consumerData || !consumerData.id) {
        throw new BadRequestException('consumer not found');
      } else {
        dto.consumer = consumerData;
      }
    }
    if (dto.userId) {
      const userData = await this.userService.findOne({
        id: dto.userId,
      });
      if (!userData || !userData.id) {
        throw new BadRequestException('user not found');
      } else {
        dto.user = userData;
      }
    }

    const userMapping = await this.service.findOne({
      where: { id },
      join: {
        leftJoinAndSelect: { tvDevice: 'mapping.tvDevice' },
        alias: 'mapping',
      },
    });

    if (dto.mappingStatus === 'INACTIVE') {
      // 맵핑 삭제
      this.firebaseMessage.sendToDevice(
        [userMapping?.tvDevice?.tvDeviceToken],
        {
          // notification: {
          //   title: '차량 알림',
          //   body:
          //     dto.messageContent ||
          //     '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
          // },
          data: {
            isConnected: 'false',
          },
        },
      );
    }
    return this.base.updateOneBase(req, dto);
  }
}
