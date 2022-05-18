import {
  Global,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EventModule } from 'modules/event';
import { HealthModule } from 'modules/health/health.module';
import { MessageModule } from 'modules/message/message.module';
import { SentryModule } from 'modules/sentry/sentry.module';
import * as path from 'path';
import { CommonModule } from './../common';
import { ConfigModule, ConfigService } from './../config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { winstonOptions } from './app-logging';
import { WinstonModule } from 'nest-winston';
import * as admin from 'firebase-admin';
import { FirebaseAdminModule } from 'modules/firebase';
import { FcmTokenModule } from 'modules/api.admin/v1/fcmToken';
import { CategoryModule } from 'modules/category/category.module';
import { UserMappingModule } from 'modules/userMapping/userMapping.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor } from 'modules/sentry/sentry.interceptor';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { AllExceptionsFilter } from 'modules/common/HttpExeption';
import { ProviderLogModule } from 'modules/providerLog';
import { ConsumerLogModule } from 'modules/consumerLog';
import { UserMappingLogModule } from 'modules/userMappingLog';
import { TvAppV1ApiModule } from 'modules/api.tvapp/v1/tvapp.v1.module';
import { ProviderApiModule } from 'modules/api.provider/v1/provider.module';
import { TvAppV0ApiModule } from 'modules/api.tvapp/v0/tvapp.module';
import { AdminV1Module } from 'modules/api.admin/v1/admin.v1.module';
import { MobileV1Module } from 'modules/api.mobile/v1/mobile.v1.module';
import { AuthModule } from 'modules/api.mobile/v1/auth';
import { PassportModule } from '@nestjs/passport';
import { BatchModule } from 'modules/batch/batch.module';
import { SwaggerAdminBasicAuthMiddleware } from 'modules/common/middleware/SwaggerAdminBasicAuth.middleware';
import { SwaggerProviderBasicAuthMiddleware } from 'modules/common/middleware/SwaggerProviderBasicAuth.middleware';
import { SwaggerHelper } from 'swagger';
import { SwaggerMobileBasicAuthMiddleware } from 'modules/common/middleware/SwaggerMobileBasicAuth.middleware';
import { SwaggerTvAppBasicAuthMiddleware } from 'modules/common/middleware/SwaggerTvAppBasicAuth.middleware';
import { UserModule, UsersService } from 'modules/user';

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
            migrationsDir: 'src/migration',
          },
          timezone: 'UTC',
          migrationsTableName: 'migrations_typeorm',
          migrationsRun: true,
          keepConnectionAlive: configService.get('DB_CONNECTION_ALIVE'),
          // logging: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    UserModule,
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
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        parserOptions: {
          path: path.join(__dirname, '../../i18n/'),
          watch: false,
        },
      }),
      parser: I18nJsonParser,
      inject: [],
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),

    HealthModule,
    CommonModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EventModule,
    ConsumerLogModule,
    ProviderLogModule,
    MessageModule,
    FcmTokenModule,
    CategoryModule,
    UserMappingModule,
    UserMappingLogModule,
    ProviderApiModule,
    TvAppV0ApiModule,
    AdminV1Module,
    MobileV1Module,
    TvAppV1ApiModule,
    BatchModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const swaggerHelper = new SwaggerHelper();
    consumer.apply(SwaggerAdminBasicAuthMiddleware).forRoutes({
      path: swaggerHelper.getAdminApi(),
      method: RequestMethod.ALL,
    });
    consumer.apply(SwaggerProviderBasicAuthMiddleware).forRoutes({
      path: swaggerHelper.getProviderApi(),
      method: RequestMethod.GET,
    });
    consumer.apply(SwaggerMobileBasicAuthMiddleware).forRoutes({
      path: swaggerHelper.getMobileApi(),
      method: RequestMethod.GET,
    });
    consumer.apply(SwaggerTvAppBasicAuthMiddleware).forRoutes({
      path: swaggerHelper.getTvAppApi(),
      method: RequestMethod.GET,
    });
  }
}
