import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/entities';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { CronService } from './cron.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TvCertCode, User]),
    ScheduleModule.forRoot(),
  ],
  providers: [CronService],
})
export class BatchModule {}
