import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Event,
  User,
  EventType,
  Eventitemresult,
  FcmToken,
  UserMapping,
  Message,
} from 'modules/entities';
import CrudsFcmTokenService from 'modules/fcmToken/fcmToken.service';
import { MessageService } from 'modules/message/message.service';
import { UsersService } from 'modules/user';
import { CrudEventController } from './event.controller';
import CrudsEventService from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      User,
      EventType,
      Eventitemresult,
      FcmToken,
      Message,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    CrudsEventService,
    CrudsFcmTokenService,
    UsersService,
    MessageService,
  ],
  exports: [CrudsEventService],
  controllers: [CrudEventController],
})
export class EventModule {}
