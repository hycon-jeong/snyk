import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { TvDeviceModule } from '../device/tv.device.module';
import { TvAuthController } from './tv.auth.controller';
import { TvAuthService } from './tv.auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TvCertCode]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TvDeviceModule,
  ],
  controllers: [TvAuthController],
  providers: [TvAuthService],
  exports: [TvAuthService],
})
export class TvAuthModule {}
