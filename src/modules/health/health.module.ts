import { Module } from '@nestjs/common';
import {
  HealthCheckService,
  TerminusModule,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';

@Module({
  imports: [
    // Make sure TypeOrmModule is available in the module context
    TypeOrmModule.forRoot(),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
