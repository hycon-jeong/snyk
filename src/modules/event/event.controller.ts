import { BadRequestException, Logger, UnauthorizedException } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
import { Event, EventType, User } from 'modules/entities';
import CrudsFcmTokenService from 'modules/fcmToken/fcmToken.service';
import { FirebaseMessagingService } from 'modules/firebase';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/provider/provider.service';
import { UsersService } from 'modules/user';
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
        eager: true,
      },
      user: {
        eager: true,
        alias: 'user_query',
        exclude: ['password'],
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
    public readonly usersService: UsersService,
    public readonly providerService: CrudsProviderService,
    public readonly categoryService: CategoryService,
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
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
    let user: User = req.parsed?.authPersist?.user;

    if (tokensArray && tokensArray.length > 0) {
      this.firebaseMessage.sendToDevice(tokensArray, {
        notification: {
          title: 'My car service event title',
          body: messageData.message || 'notificaiton message',
        },
      });
    }
    return this.base.createOneBase(req, {
      user: user,
      message: messageData,
      category: categoryData,
      status: EventStatus.COMPLETE,
      imageUrl: dto.imageUrl,
      providerKey: '',
      issuedAt: dto.issuedAt ? dto.issuedAt : new Date(),
      provider: providerData,
      eventType: dto.eventType,
    } as Event);
  }

  @Override('updateOneBase')
  async updateFunction(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateEventDto,
  ) {
    const event: Partial<Event> = dto;
    if (dto.eventTypeId) {
      const eventTypeData = await this.eventTypeRepository.findOne({id: dto.eventTypeId});
      if (!eventTypeData || !eventTypeData.id) {
        throw new BadRequestException('Event Type not found');
      }
      event.eventType = eventTypeData
    }
    if (dto.categoryId) {
      const categoryData = await this.categoryService.findOne({id: dto.categoryId});
      if (!categoryData || !categoryData.id) {
        throw new BadRequestException('category Type not found');
      }
      event.category = categoryData
    }
    this.logger.log(event);
    return this.service.updateOne(req, event);
  }
}
