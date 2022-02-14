import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { timeStamp } from 'console';
import { UserMapping } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserMappingService {
  constructor(
    @InjectRepository(UserMapping)
    private readonly userMappingRepository: Repository<UserMapping>,
  ) {}

  updateUserMappings(value, condition) {
    return this.userMappingRepository
      .createQueryBuilder()
      .update(UserMapping)
      .set(value)
      .where(condition)
      .execute();
  }
}
