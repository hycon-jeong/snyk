import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { AuthorityModule } from './authority/authority.module';
import { BlockerModule } from './blocker/blocker.module';
import { ConsumerModule } from './consumer';
import { EventModule } from './event';
import { EventLogModule } from './log/event';
import { SystemLogModule } from './log/system/systemLog.module';
import { UserLogModule } from './log/user/userLog.module';
import { ProviderModule } from './provider';
import { StatisticsModule } from './statistics/statistics.module';
import { UserModule } from './user';

@Module({
  imports: [
    BlockerModule,
    AuthorityModule,
    UserLogModule,
    EventLogModule,
    SystemLogModule,
    AuthModule,
    ConsumerModule,
    ProviderModule,
    UserModule,
    EventModule,
    StatisticsModule,
  ],
})
export class AdminV1Module {}
