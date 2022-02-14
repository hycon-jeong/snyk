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
import { UserModule } from 'modules/user';
import { TvAppModule } from 'modules/tvapp/tvapp.module';
import { TvAuthModule } from 'modules/tvapp/auth/tv.auth.module';

dotenv.config();

const { APP_PORT, APP_ENV } = process.env;

async function bootstrap() {
  const logger =
    process.env.NODE_ENV === 'production'
      ? WinstonModule.createLogger(winstonOptions)
      : new Logger('Bootstrap Logger');
  const nestAppOptions: NestApplicationOptions = {
    logger: logger,
  };
  const app = await NestFactory.create(AppModule, nestAppOptions);
  setupSwagger(app);
  // provider api docs
  setupProviderSwagger(app, { include: [TvAppModule] });
  // tvapp api docs
  setupTvAppSwagger(app, { include: [TvAuthModule] });

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
