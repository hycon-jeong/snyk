import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockerModule } from 'modules/api.admin/v1/blocker/blocker.module';
import { CrudBlockerService } from 'modules/api.admin/v1/blocker/blocker.service';
import { ConsumerLog, EventLog, ProviderLog, UserLog } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Role } from 'modules/entities/role.entity';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { LogService } from './services/LogService';
import { RoleService } from './services/RoleService';
import { ExistsValidator } from './validator/exists.validator';
import { UniqueValidator } from './validator/unique.validator';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Blocker, UserLog, SystemLog, EventLog, Role]),
  ],
  providers: [
    UniqueValidator,
    ExistsValidator,
    CrudBlockerService,
    LogService,
    RoleService,
  ],
  exports: [CrudBlockerService, LogService, RoleService],
})
export class CommonModule {}
