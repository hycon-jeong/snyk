import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const YAML = require('yaml');
import * as fs from 'fs';
import {
  SWAGGER_ADMIN_API_CURRENT_VERSION,
  SWAGGER_ADMIN_API_DESCRIPTION,
  SWAGGER_ADMIN_API_NAME,
  SWAGGER_ADMIN_API_ROOT,
  SWAGGER_MOBILE_API_CURRENT_VERSION,
  SWAGGER_MOBILE_API_DESCRIPTION,
  SWAGGER_MOBILE_API_NAME,
  SWAGGER_MOBILE_API_ROOT,
  SWAGGER_PROVIDER_API_ROOT,
  SWAGGER_PROVIDER_API_DESCRIPTION,
  SWAGGER_PROVIDER_API_CURRENT_VERSION,
  SWAGGER_PROVIDER_API_NAME,
  SWAGGER_TVAPP_API_CURRENT_VERSION,
  SWAGGER_TVAPP_API_DESCRIPTION,
  SWAGGER_TVAPP_API_NAME,
  SWAGGER_TVAPP_API_ROOT,
} from './constants';

export const setupAdminSwagger = (app: INestApplication, config?) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_ADMIN_API_NAME)
    .setDescription(SWAGGER_ADMIN_API_DESCRIPTION)
    .setVersion(SWAGGER_ADMIN_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, config);
  const yamlString: string = YAML.stringify(document);
  // fs.writeFileSync('./swagger-admin.yaml', yamlString);

  return () =>
    SwaggerModule.setup(SWAGGER_ADMIN_API_ROOT, app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
};

export const setupProviderSwagger = (app: INestApplication, config?) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_PROVIDER_API_NAME)
    .setDescription(SWAGGER_PROVIDER_API_DESCRIPTION)
    .setVersion(SWAGGER_PROVIDER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, config);
  const yamlString: string = YAML.stringify(document);
  // fs.writeFileSync('./swagger-provider.yaml', yamlString);

  SwaggerModule.setup(SWAGGER_PROVIDER_API_ROOT, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
};

export const setupTvAppSwagger = (app: INestApplication, config?) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TVAPP_API_NAME)
    .setDescription(SWAGGER_TVAPP_API_DESCRIPTION)
    .setVersion(SWAGGER_TVAPP_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, config);
  const yamlString: string = YAML.stringify(document);
  // fs.writeFileSync('./swagger-tvapp.yaml', yamlString);

  SwaggerModule.setup(SWAGGER_TVAPP_API_ROOT, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
};

export const setupMobileSwagger = (app: INestApplication, config?) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_MOBILE_API_NAME)
    .setDescription(SWAGGER_MOBILE_API_DESCRIPTION)
    .setVersion(SWAGGER_MOBILE_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, config);
  const yamlString: string = YAML.stringify(document);
  // fs.writeFileSync('./swagger-tvapp.yaml', yamlString);

  SwaggerModule.setup(SWAGGER_MOBILE_API_ROOT, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
};
