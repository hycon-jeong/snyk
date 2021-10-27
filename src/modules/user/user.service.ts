import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

import { UserFillableFields } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
}
