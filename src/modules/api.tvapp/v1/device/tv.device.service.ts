import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { TvDevice } from 'modules/entities/tvDevice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TvDeviceService {
  constructor(
    @InjectRepository(TvDevice)
    private readonly repository: Repository<TvDevice>,
  ) {}

  getTvDeviceOne(params) {
    return this.repository.findOne(params);
  }

  createTvDevice(payload) {
    return this.repository.save(payload);
  }
}
