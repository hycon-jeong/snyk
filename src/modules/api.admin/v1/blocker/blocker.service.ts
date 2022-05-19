import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Provider } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrudBlockerService extends TypeOrmCrudService<Blocker> {
  constructor(
    @InjectRepository(Blocker)
    blockerRepository: Repository<Blocker>,
  ) {
    super(blockerRepository);
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
