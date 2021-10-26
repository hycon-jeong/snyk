import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export default class CrudsEventService extends TypeOrmCrudService<EventEntity> {
  constructor(
    @InjectRepository(EventEntity)
    eventRepository: Repository<EventEntity>,
  ) {
    super(eventRepository);
  }
}
