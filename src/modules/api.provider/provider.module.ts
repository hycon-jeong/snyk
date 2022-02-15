import { Module } from '@nestjs/common';
import { ProviderEventModule } from './event/provider.event.module';

@Module({
  imports: [ProviderEventModule],
})
export class ProviderApiModule {}
