import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Provider } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsProviderService extends TypeOrmCrudService<Provider> {
  constructor(
    @InjectRepository(Provider)
    providersRepository: Repository<Provider>,
  ) {
    super(providersRepository);
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
