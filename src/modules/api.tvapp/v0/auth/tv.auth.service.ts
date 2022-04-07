import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TvAuthService {
  constructor(
    @InjectRepository(TvCertCode)
    private readonly repository: Repository<TvCertCode>,
  ) {}

  getTvCertCodeOne(params) {
    return this.repository.findOne(params);
  }

  createTvCertCode(payload) {
    return this.repository.save(payload);
  }
}
