import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerLog, User, Event, Consumer } from 'modules/entities';
import CrudsConsumerService from 'modules/api.mobile/v1/consumer/consumer.service';
import { CrudConsumerLogController } from './consumerLog.controller';
import CrudsConsumerLogService from './consumerLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumerLog, User, Event, Consumer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsConsumerLogService, CrudsConsumerService],
  exports: [CrudsConsumerLogService],
  controllers: [CrudConsumerLogController],
})
export class ConsumerLogModule {}
