import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumerLog, EventLog, ProviderLog, UserLog } from 'modules/entities';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(SystemLog)
    private systemLogRepository: Repository<SystemLog>,
    @InjectRepository(EventLog)
    private eventLogRepository: Repository<EventLog>,
    @InjectRepository(UserLog)
    private userLogRepository: Repository<UserLog>,
  ) {}

  async createSystemLog(log: Partial<SystemLog>) {
    const newLog = await this.systemLogRepository.save(log);
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
