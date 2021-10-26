import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ProviderEntity } from './provider.entity';

@Injectable()
export default class CrudsProviderService extends TypeOrmCrudService<ProviderEntity> {
  constructor(
    @InjectRepository(ProviderEntity)
    providersRepository: Repository<ProviderEntity>,
  ) {
    super(providersRepository);
  }
}
