import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMappingLog, User, Event, Consumer } from 'modules/entities';
import { CrudUserMappingLogController } from './userMappingLog.controller';
import CrudsUserMappingLogService from './userMappingLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMappingLog, User, Event, Consumer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsUserMappingLogService],
  exports: [CrudsUserMappingLogService],
  controllers: [CrudUserMappingLogController],
})
export class UserMappingLogModule {}
