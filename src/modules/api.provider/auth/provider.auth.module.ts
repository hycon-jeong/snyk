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
import CrudsProviderAuthService from './provider.auth.service';
import { CrudProviderAuthController } from './provider.auth.controller';

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
    CrudsProviderAuthService,
    CrudsFcmTokenService,
    UsersService,
    MessageService,
    CrudsProviderService,
    CategoryService,
  ],
  exports: [CrudsProviderAuthService],
  controllers: [CrudProviderAuthController],
})
export class ProviderAuthModule {}
