import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { ConfigModule } from 'modules/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {
  Consumer,
  Event,
  EventLog,
  Message,
  Provider,
  User,
} from 'modules/entities';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      Consumer,
      Provider,
      User,
      Event,
      EventLog,
      Message,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RoleModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
