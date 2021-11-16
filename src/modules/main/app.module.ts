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
import * as admin from 'firebase-admin';
import { FirebaseAdminModule } from 'modules/firebase';
import { FcmTokenModule } from 'modules/fcmToken';
import { CategoryModule } from 'modules/category/category.module';
import { UserMappingModule } from 'modules/userMapping/userMapping.module';
var serviceAccount = require('../../../firebase.json');

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
          cli: {
            migrationsDir: 'src/migration'
          },
          migrationsTableName: "migrations_typeorm",
          migrationsRun: true,
          keepConnectionAlive: configService.get('DB_CONNECTION_ALIVE'),
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    // SentryModule.forRoot({
    //   dsn: process.env.SENTRY_DNS,
    //   tracesSampleRate: 1.0,
    //   debug: true,
    // }),
    WinstonModule.forRoot(winstonOptions),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('configService.get(client_email)');
        console.log(configService.get('project_id'));
        return {
          credential: admin.credential.cert(serviceAccount),
          // databaseURL: `https://${configService.get('project_id')}.firebaseio.com`
        };
      },
    }),
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
    FcmTokenModule,
    CategoryModule,
    UserMappingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
