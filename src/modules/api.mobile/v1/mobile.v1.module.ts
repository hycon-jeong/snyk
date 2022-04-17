import { Module } from '@nestjs/common';
import { ConsumerModule } from './consumer';
import { ProviderModule } from './provider';

@Module({
  imports: [ProviderModule, ConsumerModule],
})
export class MobileV1Module {}
