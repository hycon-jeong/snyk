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
import { LogActionType } from 'modules/entities/logActionType.entity';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { Repository } from 'typeorm';

type SystemLogActionType =
  | 'system.get'
  | 'system.post'
  | 'system.patch'
  | 'system.delete';
type UserLogActionType =
  | 'user.get'
  | 'user.post'
  | 'user.patch'
  | 'user.delete'
  | 'user.login'
  | 'user.register'
  | 'user.logout';
export type EventLogActionType =
  | 'event.get'
  | 'event.post'
  | 'event.patch'
  | 'event.delete'
  | 'event.sending'
  | 'event.receive'
  | 'event.complete'
  | 'event.display'
  | 'event.fail';
@Injectable()
export class LogService {
  constructor(
    @InjectRepository(SystemLog)
    private systemLogRepository: Repository<SystemLog>,
    @InjectRepository(EventLog)
    private eventLogRepository: Repository<EventLog>,
    @InjectRepository(UserLog)
    private userLogRepository: Repository<UserLog>,
    @InjectRepository(LogActionType)
    private logActionTypeRepository: Repository<LogActionType>,
  ) {}

  async getLogActionType(
    type: SystemLogActionType | EventLogActionType | UserLogActionType,
  ) {
    return this.logActionTypeRepository.findOne({ code: type });
  }

  async createSystemLog(log: Partial<SystemLog>, type: SystemLogActionType) {
    const actionType = await this.getLogActionType(type);
    const newLog = await this.systemLogRepository.save({
      ...log,
      logTypeId: actionType.id,
    });
    return newLog;
  }
  async createEventrLog(log: Partial<EventLog>, type: EventLogActionType) {
    const actionType = await this.getLogActionType(type);
    const newLog = await this.eventLogRepository.save({
      ...log,
      logTypeId: actionType.id,
    });
    return newLog;
  }

  async createUserLog(log: Partial<UserLog>, type: UserLogActionType) {
    const actionType = await this.getLogActionType(type);
    const newLog = await this.userLogRepository.save({
      ...log,
      logTypeId: actionType.id,
    });
    return newLog;
  }

  eventMethod = {
    'event.get': '읽기',
    'event.post': '생성',
    'event.patch': '수정',
    'event.delete': '삭제',
    'event.receive': '수신',
    'event.display': '노출',
    'event.complete': '확인',
    'event.fail': '오류',
  };

  eventLogMessageTemplate = (
    type: EventLogActionType,
    user: User,
    event: Event,
    optMessage?: string,
  ) => {
    if (optMessage) return optMessage;
    const tp = this.eventMethod[type];
    return `[${tp}] 유저 : ${user.userKey} , '${event.messageTitle}' 이벤트 ${tp}`;
  };
}
