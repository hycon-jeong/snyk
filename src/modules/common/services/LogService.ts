import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConsumerLog,
  Event,
  EventLog,
  ProviderLog,
  User,
  UserLog,
} from 'modules/entities';
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

  eventMethod = {
    Get: '읽기',
    Post: '생성',
    Patch: '수정',
    Delete: '삭제',
    Receive: '수신',
    Complete: '확인',
    Fail: '오류',
  };

  eventLogMessageTemplate = (
    type: 'Get' | 'Post' | 'Patch' | 'Delete' | 'Receive' | 'Complete' | 'Fail',
    user: User,
    event: Event,
    optMessage?: string,
  ) => {
    if (optMessage) return optMessage;
    const tp = this.eventMethod[type];
    return `[${tp}] 유저 : ${user.userKey} , '${event.messageTitle}' 이벤트 ${tp}`;
  };
}
