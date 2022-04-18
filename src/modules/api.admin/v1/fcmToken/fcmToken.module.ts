import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FcmToken, User, UserMapping } from 'modules/entities';
import { CrudFcmTokenController } from './fcmToken.controller';
import CrudsFcmTokenService from './fcmToken.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FcmToken, User, UserMapping]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsFcmTokenService],
  exports: [CrudsFcmTokenService],
  controllers: [CrudFcmTokenController],
})
export class FcmTokenModule {}
