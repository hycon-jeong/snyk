import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserFillableFields } from './user.entity';

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
