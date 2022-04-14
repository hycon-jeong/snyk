import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserMappingLog,
  User,
  Event,
  Consumer,
  UserLog,
} from 'modules/entities';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { CrudSystemLogController } from './systemLog.controller';
import { CrudSystemLogService } from './systemLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemLog]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudSystemLogService],
  exports: [CrudSystemLogService],
  controllers: [CrudSystemLogController],
})
export class SystemLogModule {}
