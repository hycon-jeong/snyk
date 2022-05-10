import {
  BadRequestException,
  Get,
  Logger,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { CategoryService } from 'modules/category/category.service';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { Event, User } from 'modules/entities';
import CrudsFcmTokenService from 'modules/api.admin/v1/fcmToken/fcmToken.service';
import { FirebaseMessagingService } from 'modules/firebase';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import { UsersService } from 'modules/user';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import CrudsEventService from './event.service';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { RolesGuard } from 'modules/common/guard/roles.guard';

@ApiBearerAuth()
@Crud({
  model: {
    type: Event,
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
  query: {
    join: {
      message: {
        alias: 'message_query',
        eager: true,
      },
      category: {
        alias: 'category_query',
        eager: true,
      },
      provider: {
        alias: 'provider_query',
        eager: true,
      },
      userMapping: {
        alias: 'userMapping_query',
        eager: true,
      },
      user: {
        alias: 'user_query',
        eager: true,
      },
      eventType: {
        alias: 'eventType_query',
        // eager: true,
      },

      'userMapping.consumer': {
        eager: true,
        alias: 'consumer_query',
      },
    },
  },
})
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER, Roles.MANAGER)
@Controller('api/admin/v1/event')
@ApiTags('event')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CrudEventController implements CrudController<Event> {
  private logger = new Logger('EventController');
  constructor(
    private firebaseMessage: FirebaseMessagingService,
    public readonly service: CrudsEventService,
    public readonly fcmTokenService: CrudsFcmTokenService,
    public readonly messageService: MessageService,
    public readonly usersService: UsersService,
    public readonly providerService: CrudsProviderService,
    public readonly categoryService: CategoryService,
  ) {}
  get base(): CrudController<Event> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateEventDto,
  ) {
    const fcmTokens = await this.fcmTokenService.find({});
    const tokensArray = fcmTokens.map((item) => item.token);
    const messageData = await this.messageService.findOne({
      id: dto.mesage,
    });
    if (!messageData || !messageData.id) {
      throw new BadRequestException('Message not found');
    }
    const providerData = await this.providerService.findOne({
      id: dto.provider,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    const categoryData = await this.categoryService.findOne({
      id: dto.category,
    });
    if (!categoryData || !categoryData.id) {
      throw new BadRequestException('cagetory not found');
    }
    // let user: User = req.parsed?.authPersist?.user;

    if (tokensArray && tokensArray.length > 0) {
      this.firebaseMessage.sendToDevice(tokensArray, {
        data: {
          body: '마이카 알람서비스로부터 차량 충돌 알림이 도착하였습니다.',
          imageUrl: 'https://i.ibb.co/71YvfCK/image.png',
          title: '차량 알림',
        },
      });
    }
    return this.base.createOneBase(req, {
      userMappingId: dto.userMappingId,
      message: messageData,
      category: categoryData,
      status: EventStatus.COMPLETE,
      imageUrl: dto.imageUrl,
      providerKey: '',
      issuedAt: dto.issuedAt ? dto.issuedAt : new Date(),
      provider: providerData,
      messageContent: dto.messageContent,
    } as Event);
  }

  @Get('provider/manage')
  @ApiQuery({
    name: 'providerId',
    description: 'providerId',
    type: String,
    required: false,
  })
  async getProviderApiCalls(@Query() query): Promise<any> {
    const { providerId } = query;
    const providerList = await this.service.getProviderApiCalls({ providerId });
    return providerList;
  }

  @Get('provider/monthly/manage')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiQuery({
    description: '시작날짜',
    name: 'start_date',
    type: String,
    required: false,
  })
  @ApiQuery({
    description: '마지막 날짜',
    name: 'end_date',
    type: String,
    required: false,
  })
  @ApiQuery({
    description: 'provider id',
    name: 'providerId',
    type: String,
    required: false,
  })
  @ApiQuery({
    description: 'consumer id',
    name: 'consumerId',
    type: String,
    required: false,
  })
  async getProviderApiCallsByMonthly(@Query() query): Promise<any> {
    const { start_date, end_date, providerId, consumerId } = query;
    const providerList = await this.service.getProviderApiCallsByMonthly({
      start_date,
      end_date,
      providerId,
      consumerId,
    });
    return providerList;
  }

  @Get('consumer/manage')
  @ApiQuery({
    name: 'providerId',
    description: 'providerId',
    type: String,
    required: false,
  })
  async getConsumerApiCalls(@Query() query): Promise<any> {
    const { providerId } = query;
    const consumerList = await this.service.getConsumerApiCalls({ providerId });

    return consumerList;
  }
}
