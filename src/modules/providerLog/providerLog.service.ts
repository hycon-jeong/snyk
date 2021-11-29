import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ProviderLog } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsProviderLogService extends TypeOrmCrudService<ProviderLog> {
  constructor(
    @InjectRepository(ProviderLog)
    providerLogRepository: Repository<ProviderLog>,
  ) {
    super(providerLogRepository);
  }
}
