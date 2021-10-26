import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Event } from './event.entity';
import { EventRO } from './event.interface';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(options?: DeepPartial<Event>): Promise<EventRO> {
    const event = await this.eventRepository.findOne(options);
    delete event.id;
    return event;
  }

  async create(payload: EventRO) {
    const event = await this.eventRepository.findOne({ id: payload.id });

    if (event) {
      throw new NotAcceptableException(
        'Event with provided eventid already created.',
      );
    }

    return await this.eventRepository.save(payload);
  }
}
