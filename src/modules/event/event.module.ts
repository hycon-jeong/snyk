import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'modules/common';
import { ConfigModule, ConfigService } from './../config';
import { EventController } from './event.controller';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    CommonModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [],
})
export class EventModule {}
