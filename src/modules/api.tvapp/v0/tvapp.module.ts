import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvDeviceModule } from './device/tv.device.module';
import { TvTestModule } from './test/tv.test.module';
import { TvAuthModule } from './auth/tv.auth.module';

@Module({
  imports: [TvAuthModule, TvDeviceModule, TvTestModule],
})
export class TvAppV0ApiModule {}
