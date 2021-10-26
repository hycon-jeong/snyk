import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/user';
import { CrudConsumerController } from './consumer.controller';
import { ConsumerEntity } from './consumer.entity';
import CrudsConsumerService from './consumer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumerEntity, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsConsumerService],
  exports: [CrudsConsumerService],
  controllers: [CrudConsumerController],
})
export class ConsumerModule {}
