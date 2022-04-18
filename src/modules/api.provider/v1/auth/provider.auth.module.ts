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
  Consumer,
} from 'modules/entities';
import CrudsFcmTokenService from 'modules/api.admin/v1/fcmToken/fcmToken.service';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import { UserModule, UsersService } from 'modules/user';
import { UserMappingModule } from 'modules/userMapping/userMapping.module';
import CrudsProviderAuthService from './provider.auth.service';
import { CrudProviderAuthController } from './provider.auth.controller';
import { AuthModule } from 'modules/auth';
import { Role } from 'modules/entities/role.entity';
import { RoleService } from 'modules/auth/role.service';
import CrudsConsumerService from 'modules/api.mobile/v1/consumer/consumer.service';

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
      Role,
      Consumer,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserMappingModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    CrudsProviderAuthService,
    CrudsFcmTokenService,
    UsersService,
    MessageService,
    CrudsProviderService,
    CategoryService,
    RoleService,
    CrudsConsumerService,
  ],
  exports: [CrudsProviderAuthService],
  controllers: [CrudProviderAuthController],
})
export class ProviderAuthModule {}
