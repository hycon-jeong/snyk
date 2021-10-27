import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsEventService extends TypeOrmCrudService<Event> {
  constructor(
    @InjectRepository(Event)
    eventRepository: Repository<Event>,
  ) {
    super(eventRepository);
  }
}
