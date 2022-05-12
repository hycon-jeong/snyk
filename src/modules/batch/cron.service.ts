import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { LessThan, Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(TvCertCode)
    private readonly repository: Repository<TvCertCode>,
  ) {}
  private readonly logger = new Logger(CronService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const current = moment().utc();

    const list = await this.repository.delete({
      expireDt: LessThan(current.toISOString()),
    });
    this.logger.warn('Delete tvCertCode expired');
  }
}
