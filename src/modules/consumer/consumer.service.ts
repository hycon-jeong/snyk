import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ConsumerEntity } from './consumer.entity';

@Injectable()
export default class CrudsConsumerService extends TypeOrmCrudService<ConsumerEntity> {
  constructor(
    @InjectRepository(ConsumerEntity)
    consumersRepository: Repository<ConsumerEntity>,
  ) {
    super(consumersRepository);
  }
}
