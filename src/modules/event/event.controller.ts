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
import { Event, User } from 'modules/entities';
import CrudsFcmTokenService from 'modules/fcmToken/fcmToken.service';
import { FirebaseMessagingService } from 'modules/firebase';
import { MessageService } from 'modules/message/message.service';
import { UsersService } from 'modules/user';
import { CreateEventDto } from './dto/create-event.dto';
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
        eager: true,
      },
      user: {
        eager: true,
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
  ) {}
  get base(): CrudController<Event> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateEventDto,
  ) {
    // client generate token for each device, send that token to backend
    // need store device token on db
    // send to device base on that token
    const fcmTokens = await this.fcmTokenService.find({});
    const tokensArray = fcmTokens.map((item) => item.token);
    console.log(tokensArray);
    const messageData = await this.messageService.findOne({
      id: dto.mesage_id,
    });
    if (!messageData || !messageData.id) {
      throw new BadRequestException('Message not found');
    }

    // const userData = await this.usersService.findOne({id: dto.user_id});
    let user: User = req.parsed?.authPersist?.user;
    // if (userData.id) {
    //   user = userData
    // }

    console.log('messageData.message');
    console.log(messageData.message);

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
      categroy: dto.category,
      eventType: dto.event_type,
      status: dto.status,
      providerId: dto.provider_id,
      providerCode: dto.provider_code,
      providerKey: '',
      issuedAt: dto.issued_at ? dto.issued_at : new Date(),
    } as Event);
  }
}
