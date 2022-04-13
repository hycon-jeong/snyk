import { Injectable } from '@nestjs/common';
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
}
