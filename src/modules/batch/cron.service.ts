import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';
import * as moment from 'moment';
import { User } from 'modules/entities';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(TvCertCode)
    private readonly repository: Repository<TvCertCode>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(CronService.name);

  // tv 인증코드 - 자정
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleTvCertCode() {
    const current = moment().utc();

    await this.repository.delete({
      expireDt: LessThan(current.toISOString()),
    });
    this.logger.warn('Delete tvCertCode expired');
  }

  /**
   * 유저 비밀번호 만료 처리
   * 비밀번호 변경 6개월
   * 최근 로그인 3개월
   *
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleUserPasswordExpired() {
    const current = moment().utc();
    const before6m = current.clone().subtract(6, 'months');
    const before3m = current.clone().subtract(3, 'months');

    const userList = await this.userRepository.find({
      where: [
        {
          lastLoginedAt: LessThan(before3m.toISOString()),
          status: Not('EXPIRED'),
        },
        {
          lastPwModifiedAt: LessThan(before6m.toISOString()),
          status: Not('EXPIRED'),
        },
      ],
    });

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: 'EXPIRED' })
      .whereInIds(userList.map((user) => user.id))
      .execute();

    this.logger.warn('Update user expired');
  }
}
