import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Message } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService extends TypeOrmCrudService<Message> {
  constructor(
    @InjectRepository(Message)
    private readonly userRepository: Repository<Message>,
  ) {
    super(userRepository);
  }
}
