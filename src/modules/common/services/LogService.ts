import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumerLog, EventLog, ProviderLog, UserLog } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(ConsumerLog)
    private consumerLogRepository: Repository<ConsumerLog>,
    @InjectRepository(ProviderLog)
    private providerLogRepository: Repository<ProviderLog>,
    @InjectRepository(EventLog)
    private eventLogRepository: Repository<EventLog>,
    @InjectRepository(UserLog)
    private userLogRepository: Repository<UserLog>,
  ) {}

  async createConsumerLog(log: Partial<ConsumerLog>) {
    const newLog = await this.consumerLogRepository.save(log);
    return newLog;
  }

  async createProviderLog(log: Partial<ProviderLog>) {
    const newLog = await this.providerLogRepository.save(log);
    return newLog;
  }
  async createEventrLog(log: Partial<EventLog>) {
    const newLog = await this.eventLogRepository.save(log);
    return newLog;
  }

  async createUserLog(log: Partial<UserLog>) {
    const newLog = await this.userLogRepository.save(log);
    return newLog;
  }
}
