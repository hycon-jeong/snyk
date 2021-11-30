import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'modules/config';
import { Consumer, Event, Message, Provider, User } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getTotalConsumer() {
    const totalConsumer = this.consumerRepository.count();
    return totalConsumer;
  }

  async getTotalProvider() {
    const totalProvider = this.providerRepository.count();
    return totalProvider;
  }

  async getTotalEvent() {
    const totalEvent = this.eventRepository.count();
    return totalEvent;
  }
  async getTotalMessage() {
    const totalMessage = this.messageRepository.count();
    return totalMessage;
  }

  async getTotalUser() {
    return this.userRepository.count();
  }
}
