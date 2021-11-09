import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConsumerModule } from 'modules/consumer/consumer.module';
import { EventModule } from 'modules/event';
import { EventLogModule } from 'modules/eventLog';
import { HealthModule } from 'modules/health/health.module';
import { MessageModule } from 'modules/message/message.module';
import { ProviderModule } from 'modules/provider/provider.module';
import { SentryModule } from 'modules/sentry/sentry.module';
import { StatisticsModule } from 'modules/statistics/statistics.module';
import { UserModule } from 'modules/user';
import { AuthModule } from './../auth';
import { CommonModule } from './../common';
import { ConfigModule, ConfigService } from './../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { winstonOptions } from './app-logging';
import { WinstonModule } from 'nest-winston';
config();
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get('DB_SYNC') === 'true',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DNS,
      tracesSampleRate: 1.0,
      debug: true,
    }),
    WinstonModule.forRoot(winstonOptions),
    HealthModule,
    AuthModule,
    CommonModule,
    UserModule,
    EventModule,
    EventLogModule,
    ConsumerModule,
    ProviderModule,
    MessageModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
