import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { TrimStringsPipe } from './modules/common/transformer/trim-strings.pipe';
import { AppModule } from './modules/main/app.module';
import {
  setupProviderSwagger,
  setupAdminSwagger,
  setupTvAppSwagger,
  setupMobileSwagger,
} from './swagger';
import * as dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { winstonOptions } from 'modules/main/app-logging';
import { TvAuthModule } from 'modules/api.tvapp/v1/auth/tv.auth.module';
import { ProviderApiModule } from 'modules/api.provider/v1/provider.module';

import { AllExceptionsFilter } from 'modules/common/HttpExeption';
import { I18nModule, I18nService } from 'nestjs-i18n';
import * as morgan from 'morgan';
import winston from 'winston';
import { ProviderAuthModule } from 'modules/api.provider/v1/auth/provider.auth.module';
import { ProviderEventModule } from 'modules/api.provider/v1/event/provider.event.module';
import { TvDeviceModule } from 'modules/api.tvapp/v1/device/tv.device.module';
import { TvTestModule } from 'modules/api.tvapp/v1/test/tv.test.module';
import { TvAppV1ApiModule } from 'modules/api.tvapp/v1/tvapp.v1.module';
import { AdminV1Module } from 'modules/api.admin/v1/admin.v1.module';
import { MobileV1Module } from 'modules/api.mobile/v1/mobile.v1.module';
import { SWAGGER_ADMIN_API_ROOT } from 'swagger/constants';
import * as basicAuth from 'express-basic-auth';
import { ExpressBasicAuthMiddleware } from 'modules/common/middleware/ExpressBasicAuth.middleware';
dotenv.config();

const { APP_PORT, APP_ENV } = process.env;

async function bootstrap() {
  const logger =
    process.env.NODE_ENV === 'production'
      ? WinstonModule.createLogger(winstonOptions)
      : WinstonModule.createLogger(winstonOptions);
  const nestAppOptions: NestApplicationOptions = {
    logger: logger,
  };
  const app = await NestFactory.create(AppModule, nestAppOptions);

  // app.use(
  //   SWAGGER_ADMIN_API_ROOT + '/',
  //   basicAuth({
  //     challenge: true,
  //     users: { jason: '1234' },
  //   }),
  // );

  setupAdminSwagger(app, {
    include: [AdminV1Module],
    deepScanRoutes: true,
  });

  setupMobileSwagger(app, {
    include: [MobileV1Module],
    deepScanRoutes: true,
  });

  // provider api docs
  setupProviderSwagger(app, {
    include: [ProviderApiModule],
    deepScanRoutes: true,
  });
  // tvapp api docs
  setupTvAppSwagger(app, {
    include: [TvAppV1ApiModule],
    deepScanRoutes: true,
  });

  app.use(morgan('combined'));

  // secure app by setting various HTTP headers.
  app.use(helmet());

  // enable gzip compression.
  app.use(compression());

  // protect app from brute-force attacks
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 300, // limit each IP to 100 requests per windowMs
    }),
  );
  app.enableCors();
  app.useGlobalPipes(new TrimStringsPipe(), new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  /**
   * different deployment environments
   */
  if (APP_ENV === 'development') {
    logger.log(`Application is running in "${APP_ENV}" mode`);
  } else {
    logger.log(`Application is running in "${APP_ENV}" mode`);
  }

  await app.listen(APP_PORT || 3000);
  logger.log(`Application listening on port ${APP_PORT || 3000}`);
}
bootstrap();
