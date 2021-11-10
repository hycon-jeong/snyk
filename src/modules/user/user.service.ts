import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserMapping } from '../entities/userMapping.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UserFillableFields } from './user.interface';
import { UserMappingFillableFields } from '.';
import { Roles } from 'modules/common/constants/roles';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserMapping)
    private readonly userMappingRepository: Repository<UserMapping>,
  ) {
    super(userRepository);
  }

  async get(id: number) {
    return this.userRepository.findOne({ id });
  }

  async getByUserId(userId: string) {
    return await this.userRepository.findOne({ userId: userId });
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByUserId(payload.userId);

    if (user) {
      throw new NotAcceptableException(
        'User with provided userid already created.',
      );
    }

    return await this.userRepository.save(payload);
  }

  async moCreate(
    payload: Partial<UserFillableFields> & {
      verificationCode: string;
      role: Roles;
    },
  ) {
    const user = await this.getByUserId(payload.userId);
    if (user) {
      throw new NotAcceptableException(
        'User with provided userid already created.',
      );
    }
    payload.name = payload.verificationCode;
    return await this.userRepository.save(payload);
  }

  async createUserMapping(payload: UserMappingFillableFields) {
    return this.userMappingRepository
      .createQueryBuilder()
      .insert()
      .into(UserMapping)
      .values(payload)
      .execute();
  }
}
