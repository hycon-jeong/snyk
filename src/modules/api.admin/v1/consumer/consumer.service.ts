import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Consumer } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsConsumerService extends TypeOrmCrudService<Consumer> {
  constructor(
    @InjectRepository(Consumer)
    consumersRepository: Repository<Consumer>,
  ) {
    super(consumersRepository);
  }
}
