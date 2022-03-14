import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { TrimStringsPipe } from './modules/common/transformer/trim-strings.pipe';
import { AppModule } from './modules/main/app.module';
import {
  setupProviderSwagger,
  setupSwagger,
  setupTvAppSwagger,
} from './swagger';
import * as dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { winstonOptions } from 'modules/main/app-logging';
import { TvAuthModule } from 'modules/api.tvapp/auth/tv.auth.module';
import { ProviderApiModule } from 'modules/api.provider/provider.module';
import { ProviderEventModule } from 'modules/api.provider/event/provider.event.module';
import { TvDeviceModule } from 'modules/api.tvapp/device/tv.device.module';
import { TvTestModule } from 'modules/api.tvapp/test/tv.test.module';
import { AllExceptionsFilter } from 'modules/common/HttpExeption';
import { I18nModule, I18nService } from 'nestjs-i18n';
import * as morgan from 'morgan';
import winston from 'winston';
import { ProviderAuthModule } from 'modules/api.provider/auth/provider.auth.module';

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
  setupSwagger(app);
  // provider api docs
  setupProviderSwagger(app, {
    include: [ProviderEventModule, ProviderAuthModule],
  });
  // tvapp api docs
  setupTvAppSwagger(app, {
    include: [TvAuthModule, TvDeviceModule, TvTestModule],
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
