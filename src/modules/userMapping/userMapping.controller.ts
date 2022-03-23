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
import CrudsConsumerService from 'modules/consumer/consumer.service';
import { User, UserMapping } from 'modules/entities';
import { FirebaseMessagingService } from 'modules/firebase';
import CrudsProviderService from 'modules/provider/provider.service';
import { UsersService } from 'modules/user';
import { UserMappingService } from './userMapping.service';

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
        alias: 'user_mapping_query',
        exclude: ['password'],
      },
      provider: {
        eager: true,
        alias: 'user_mapping_provider_query',
        exclude: ['password'],
      },
      consumer: {
        eager: true,
        alias: 'user_mapping_consumer_query',
        exclude: ['password'],
      },
    },
  },
})
// @UseGuards(AuthGuard())
@Controller('api/user-mapping')
@ApiTags('userMapping')
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

  @Get('/testv1/myCarUserKey')
  async getUserMappingByMyCarUserKey(
    @ParsedRequest() req: CrudRequest,
    @Query() query,
  ) {
    const { myCarUserKey } = query;

    const user = await this.userService.findOne({
      userKey: myCarUserKey,
      status: 'ACTIVE',
    });

    if (!user || !user.id) {
      throw new BadRequestException('User not found');
    }

    const provider = await this.providerService.findOne({
      id: user.providerId,
      status: 'ACTIVE',
    });

    const userMappings = await this.service.find({
      where: {
        mappingStatus: 'ACTIVE',
        userId: user.id,
      },
      join: {
        alias: 'userMapping',
        leftJoinAndSelect: {
          consumer: 'userMapping.consumer',
        },
      },
    });
    return {
      isSuccess: true,
      data: {
        provider,
        userMappings,
        user,
      },
      statusCode: 200,
    };
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
