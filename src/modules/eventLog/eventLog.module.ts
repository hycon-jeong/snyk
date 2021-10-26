import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/user';
import { CrudEventLogController } from './eventLog.controller';
import { EventLogEntity } from './eventLog.entity';
import CrudsEventLogService from './eventLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventLogEntity, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsEventLogService],
  exports: [CrudsEventLogService],
  controllers: [CrudEventLogController],
})
export class EventLogModule {}
