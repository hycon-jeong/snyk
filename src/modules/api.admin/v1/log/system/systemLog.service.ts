import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserLog, UserMappingLog } from 'modules/entities';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrudSystemLogService extends TypeOrmCrudService<SystemLog> {
  constructor(
    @InjectRepository(SystemLog)
    systemLogRepository: Repository<SystemLog>,
  ) {
    super(systemLogRepository);
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
