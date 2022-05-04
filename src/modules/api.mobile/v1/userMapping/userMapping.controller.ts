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

@ApiBearerAuth()
@Crud({
  model: {
    type: UserMapping,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase'],
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
@Controller('api/mobile/v1/user-mapping')
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

    const user = await this.userService.findOne({
      providerId: provider.id,
      userId: userKey,
      status: 'ACTIVE',
    });

    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: {
        userMappings,
        user,
      },
    };
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
          data: {
            isConnected: 'false',
          },
        },
      );
    }

    await this.base.updateOneBase(req, dto);

    console.log(userMapping);

    const mappingList = await this.service.find({
      userId: userMapping.userId,
      mappingStatus: 'ACTIVE',
    });

    console.log(mappingList);

    if (!mappingList.length) {
      await this.userService.updateUser(
        { id: userMapping.userId },
        { status: 'INACTIVE' },
      );
    }

    return {
      statusCode: 200,
      isSuccess: true,
    };
  }
}
