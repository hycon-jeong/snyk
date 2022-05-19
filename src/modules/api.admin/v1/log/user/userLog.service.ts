import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserLog, UserMappingLog } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CrudsUserLogService extends TypeOrmCrudService<UserLog> {
  constructor(
    @InjectRepository(UserLog)
    userLogRepository: Repository<UserLog>,
  ) {
    super(userLogRepository);
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
