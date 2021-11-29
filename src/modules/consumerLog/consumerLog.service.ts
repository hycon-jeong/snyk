import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConsumerLog } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsConsumerLogService extends TypeOrmCrudService<ConsumerLog> {
  constructor(
    @InjectRepository(ConsumerLog)
    consumerLogRepository: Repository<ConsumerLog>,
  ) {
    super(consumerLogRepository);
  }
}
