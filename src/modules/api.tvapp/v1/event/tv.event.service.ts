import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Event } from 'modules/entities';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { TvDevice } from 'modules/entities/tvDevice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TvEventService extends TypeOrmCrudService<Event> {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {
    super(repository);
  }

  async update(criteria, payload) {
    return this.repository.update(criteria, payload);
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
