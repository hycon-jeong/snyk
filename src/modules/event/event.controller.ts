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
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import CrudsEventService from './event.service';

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
      eventType: {
        alias: 'eventType_query',
        // eager: true,
      },
      'userMapping.user': {
        eager: true,
        alias: 'user_query',
        exclude: ['password'],
      },
      'userMapping.consumer': {
        eager: true,
        alias: 'consumer_query',
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/event')
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
      user_mapping_id: dto.userMappingId,
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
}
