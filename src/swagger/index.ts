import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const YAML = require('yaml');
import * as fs from 'fs';
import {
  SWAGGER_API_ROOT,
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_PROVIDER_API_ROOT,
  SWAGGER_PROVIDER_API_DESCRIPTION,
  SWAGGER_PROVIDER_API_CURRENT_VERSION,
  SWAGGER_PROVIDER_API_NAME,
  SWAGGER_TVAPP_API_CURRENT_VERSION,
  SWAGGER_TVAPP_API_DESCRIPTION,
  SWAGGER_TVAPP_API_NAME,
  SWAGGER_TVAPP_API_ROOT,
} from './constants';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const yamlString: string = YAML.stringify(document);
  fs.writeFileSync('./swagger.yaml', yamlString);

  SwaggerModule.setup(SWAGGER_API_ROOT, app, document, {
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
  fs.writeFileSync('./swagger.yaml', yamlString);

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
  fs.writeFileSync('./swagger.yaml', yamlString);

  SwaggerModule.setup(SWAGGER_TVAPP_API_ROOT, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
};
