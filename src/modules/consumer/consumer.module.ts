import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerEventType, ConsumerLog, UserMapping } from 'modules/entities';
import { Consumer } from 'modules/entities/consumer.entity';
import { User } from 'modules/entities/user.entity';
import { CrudConsumerController } from './consumer.controller';
import CrudsConsumerService from './consumer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Consumer,
      User,
      ConsumerLog,
      ConsumerEventType,
      UserMapping,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsConsumerService],
  exports: [CrudsConsumerService],
  controllers: [CrudConsumerController],
})
export class ConsumerModule {}
