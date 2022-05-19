import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { timeStamp } from 'console';
import { UserMapping } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserMappingService extends TypeOrmCrudService<UserMapping> {
  constructor(
    @InjectRepository(UserMapping)
    private readonly userMappingRepository: Repository<UserMapping>,
  ) {
    super(userMappingRepository);
  }

  updateUserMappings(value, condition) {
    return this.userMappingRepository
      .createQueryBuilder()
      .update(UserMapping)
      .set(value)
      .where(condition)
      .execute();
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
