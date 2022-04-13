import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Provider } from 'modules/entities';
import { Authority } from 'modules/entities/authority.entity';
import { Blocker } from 'modules/entities/blocker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrudAuthorityService extends TypeOrmCrudService<Authority> {
  constructor(
    @InjectRepository(Authority)
    authorityRepository: Repository<Authority>,
  ) {
    super(authorityRepository);
  }
}
