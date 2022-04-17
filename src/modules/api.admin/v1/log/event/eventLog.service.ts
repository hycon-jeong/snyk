import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EventLog } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsEventLogService extends TypeOrmCrudService<EventLog> {
  constructor(
    @InjectRepository(EventLog)
    eventLogRepository: Repository<EventLog>,
  ) {
    super(eventLogRepository);
  }
}
