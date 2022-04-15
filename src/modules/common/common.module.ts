import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockerModule } from 'modules/blocker/blocker.module';
import { CrudBlockerService } from 'modules/blocker/blocker.service';
import { ConsumerLog, EventLog, ProviderLog, UserLog } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { LogService } from './services/LogService';
import { ExistsValidator } from './validator/exists.validator';
import { UniqueValidator } from './validator/unique.validator';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Blocker, UserLog, SystemLog, EventLog])],
  providers: [UniqueValidator, ExistsValidator, CrudBlockerService, LogService],
  exports: [CrudBlockerService, LogService],
})
export class CommonModule {}
