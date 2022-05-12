import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { CronService } from './cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([TvCertCode]), ScheduleModule.forRoot()],
  providers: [CronService],
})
export class BatchModule {}
