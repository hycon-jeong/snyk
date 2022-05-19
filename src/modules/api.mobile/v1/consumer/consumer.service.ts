import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
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

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
