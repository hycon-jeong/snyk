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
import CrudsFcmTokenService from 'modules/fcmToken/fcmToken.service';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/provider/provider.service';
import { UsersService } from 'modules/user';
import { UserMappingModule } from 'modules/userMapping/userMapping.module';
import { CrudEventController } from './provider.event.controller';
import CrudsEventService from './provider.event.service';

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
    UserMappingModule,
  ],
  providers: [
    CrudsEventService,
    CrudsFcmTokenService,
    UsersService,
    MessageService,
    CrudsProviderService,
    CategoryService,
  ],
  exports: [CrudsEventService],
  controllers: [CrudEventController],
})
export class ProviderEventModule {}
