import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Event,
  User,
  EventType,
  Eventitemresult,
  FcmToken,
} from 'modules/entities';
import CrudsFcmTokenService from 'modules/fcmToken/fcmToken.service';
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
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsEventService, CrudsFcmTokenService],
  exports: [CrudsEventService],
  controllers: [CrudEventController],
})
export class EventModule {}
