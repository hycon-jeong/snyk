import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, User, EventType, Eventitemresult } from 'modules/entities';
import { CrudEventController } from './event.controller';
import CrudsEventService from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User, EventType, Eventitemresult]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsEventService],
  exports: [CrudsEventService],
  controllers: [CrudEventController],
})
export class EventModule {}
