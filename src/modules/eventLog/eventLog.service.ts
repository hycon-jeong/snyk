import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { EventLogEntity } from './eventLog.entity';

@Injectable()
export default class CrudsEventLogService extends TypeOrmCrudService<EventLogEntity> {
  constructor(
    @InjectRepository(EventLogEntity)
    eventLogRepository: Repository<EventLogEntity>,
  ) {
    super(eventLogRepository);
  }
}
