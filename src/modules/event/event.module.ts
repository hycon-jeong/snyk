import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'modules/category/category.service';
import {
  Event,
  User,
  Eventitemresult,
  FcmToken,
  UserMapping,
  Message,
  Provider,
  Category,
} from 'modules/entities';
import CrudsFcmTokenService from 'modules/api.admin/v1/fcmToken/fcmToken.service';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import { CrudEventController } from './event.controller';
import CrudsEventService from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      User,
      Eventitemresult,
      FcmToken,
      Message,
      UserMapping,
      Provider,
      Category,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    CrudsEventService,
    CrudsFcmTokenService,
    MessageService,
    CrudsProviderService,
    CategoryService,
  ],
  exports: [CrudsEventService],
  controllers: [CrudEventController],
})
export class EventModule {}
