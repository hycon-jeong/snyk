import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { ConsumerModule } from './consumer';
import { ProviderModule } from './provider';
import { UserMappingModule } from './userMapping/userMapping.module';

@Module({
  imports: [ProviderModule, ConsumerModule, AuthModule, UserMappingModule],
})
export class MobileV1Module {}
