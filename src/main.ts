import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { TrimStringsPipe } from './modules/common/transformer/trim-strings.pipe';
import { AppModule } from './modules/main/app.module';
import { SwaggerHelper } from './swagger';
import * as dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { winstonOptions } from 'modules/main/app-logging';
import * as morgan from 'morgan';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { ProviderApiModule } from 'modules/api.provider/v1/provider.module';
import { TvAppV1ApiModule } from 'modules/api.tvapp/v1/tvapp.v1.module';
import { MobileV1Module } from 'modules/api.mobile/v1/mobile.v1.module';
import { AdminV1Module } from 'modules/api.admin/v1/admin.v1.module';

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
  const swaggerHelper = new SwaggerHelper();
  swaggerHelper.setApp(app);

  const { document: adminDoc } = swaggerHelper.getAdminSwaggerDocument({
    include: [AdminV1Module],
    deepScanRoutes: true,
  });
  const { document: providerDoc } = swaggerHelper.getProviderSwaggerDocument({
    include: [ProviderApiModule],
    deepScanRoutes: true,
  });
  const { document: mobileDoc } = swaggerHelper.getMobileSwaggerDocument({
    include: [MobileV1Module],
    deepScanRoutes: true,
  });
  const { document: tvAppDoc } = swaggerHelper.getTvAppSwaggerDocument({
    include: [TvAppV1ApiModule],
    deepScanRoutes: true,
  });
  const swaggerUi = loadPackage('swagger-ui-express', 'SwaggerModule', () =>
    require('swagger-ui-express'),
  );
  // set swagger static file
  app.use(swaggerHelper.getAdminApi(), swaggerUi.serveFiles(adminDoc, {}));
  app.use(
    swaggerHelper.getProviderApi(),
    swaggerUi.serveFiles(providerDoc, {}),
  );
  app.use(swaggerHelper.getMobileApi(), swaggerUi.serveFiles(mobileDoc, {}));
  app.use(swaggerHelper.getTvAppApi(), swaggerUi.serveFiles(tvAppDoc, {}));

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
