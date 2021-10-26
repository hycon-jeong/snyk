import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/user';
import { CrudEventController } from './event.controller';
import { EventEntity } from './event.entity';
import CrudsEventService from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsEventService],
  exports: [CrudsEventService],
  controllers: [CrudEventController],
})
export class EventModule {}
