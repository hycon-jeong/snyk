import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
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
}
