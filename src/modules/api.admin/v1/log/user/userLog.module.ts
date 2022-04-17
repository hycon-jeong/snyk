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
import { CrudUserLogController } from './userLog.controller';
import { CrudsUserLogService } from './userLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLog]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsUserLogService],
  exports: [CrudsUserLogService],
  controllers: [CrudUserLogController],
})
export class UserLogModule {}
