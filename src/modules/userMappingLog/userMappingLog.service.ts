import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserMappingLog } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsUserMappingLogService extends TypeOrmCrudService<UserMappingLog> {
  constructor(
    @InjectRepository(UserMappingLog)
    userMappingLogRepository: Repository<UserMappingLog>,
  ) {
    super(userMappingLogRepository);
  }
}
