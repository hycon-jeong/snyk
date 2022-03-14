import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event, User } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsProviderAuthService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async insertOne(payload): Promise<any> {
    return this.userRepository.save(payload);
  }
}
