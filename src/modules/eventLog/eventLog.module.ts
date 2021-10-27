import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventLog, User, Event, EventType } from 'modules/entities';
import { CrudEventLogController } from './eventLog.controller';
import CrudsEventLogService from './eventLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventLog, User, Event, EventType]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsEventLogService],
  exports: [CrudsEventLogService],
  controllers: [CrudEventLogController],
})
export class EventLogModule {}
