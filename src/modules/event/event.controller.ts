import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { Event, User } from 'modules/entities';
import CrudsFcmTokenService from 'modules/fcmToken/fcmToken.service';
import { FirebaseMessagingService } from 'modules/firebase';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/provider/provider.service';
import { UsersService } from 'modules/user';
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
        alias: 'message_owner',
        eager: true,
      },
      provider: {
        alias: 'provider_owner',
        eager: true,
      },
      userMapping: {
        alias: 'userMapping_owner',
        eager: true,
      },
      eventType: {
        alias: 'eventType_owner',
        eager: true,
      },
      user: {
        eager: true,
        alias: 'user_owner',
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
  constructor(
    private firebaseMessage: FirebaseMessagingService,
    public readonly service: CrudsEventService,
    public readonly fcmTokenService: CrudsFcmTokenService,
    public readonly messageService: MessageService,
    public readonly usersService: UsersService,
    public readonly providerService: CrudsProviderService,
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
      category: dto.category,
      status: EventStatus.COMPLETE,
      imageUrl: dto.imageUrl,
      providerKey: '',
      issuedAt: dto.issuedAt ? dto.issuedAt : new Date(),
      provider: providerData,
      eventType: dto.eventType,
    } as Event);
  }

  @Override('updateOneBase')
  updateFunction(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateEventDto,
  ) {
    return this.service.updateOne(req, dto);
  }
}
