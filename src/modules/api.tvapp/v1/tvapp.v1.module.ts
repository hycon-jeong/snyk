import { Module } from '@nestjs/common';
import { TvDeviceModule } from './device/tv.device.module';
import { TvTestModule } from './test/tv.test.module';
import { TvAuthModule } from './auth/tv.auth.module';
import { TvEventModule } from './event/tv.event.module';

@Module({
  imports: [TvAuthModule, TvDeviceModule, TvTestModule, TvEventModule],
})
export class TvAppV1ApiModule {}
