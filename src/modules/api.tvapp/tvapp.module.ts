import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvAuthModule } from './auth/tv.auth.module';
import { TvDeviceModule } from './device/tv.device.module';
import { TvTestModule } from './test/tv.test.module';

@Module({
  imports: [TvAuthModule, TvDeviceModule, TvTestModule],
})
export class TvAppApiModule {}
