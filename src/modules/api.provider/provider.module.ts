import { Module } from '@nestjs/common';
import { ProviderAuthModule } from './auth/provider.auth.module';
import { ProviderEventModule } from './event/provider.event.module';

@Module({
  imports: [ProviderEventModule, ProviderAuthModule],
})
export class ProviderApiModule {}
