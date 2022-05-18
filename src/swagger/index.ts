import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { loadPackage } from '@nestjs/common/utils/load-package.util';
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

export class SwaggerHelper {
  static singleton;
  private app: INestApplication;
  private adminApi = '/' + SWAGGER_ADMIN_API_ROOT + '/';
  private providerApi = '/' + SWAGGER_PROVIDER_API_ROOT + '/';
  private tvAppApi = '/' + SWAGGER_TVAPP_API_ROOT + '/';
  private mobileApi = '/' + SWAGGER_MOBILE_API_ROOT + '/';

  constructor() {
    if (SwaggerHelper.singleton) return SwaggerHelper.singleton;
    SwaggerHelper.singleton = this;
  }
  setApp(app) {
    this.app = app;
  }

  getApp() {
    return this.app;
  }

  getAdminApi() {
    return this.adminApi;
  }

  getProviderApi() {
    return this.providerApi;
  }

  getTvAppApi() {
    return this.tvAppApi;
  }

  getMobileApi() {
    return this.mobileApi;
  }

  /**Admin Swagger */
  getAdminSwaggerHtml = (config?) => {
    const { document, options } = this.getAdminSwaggerDocument(config);
    const swaggerUi = loadPackage('swagger-ui-express', 'SwaggerModule', () =>
      require('swagger-ui-express'),
    );
    const swaggerHtml = swaggerUi.generateHTML(document, options);
    const yamlString: string = YAML.stringify(document);
    // fs.writeFileSync('./swagger-admin.yaml', yamlString);
    return swaggerHtml;
  };
  getAdminSwaggerDocument = (config?) => {
    const options = new DocumentBuilder()
      .setTitle(SWAGGER_ADMIN_API_NAME)
      .setDescription(SWAGGER_ADMIN_API_DESCRIPTION)
      .setVersion(SWAGGER_ADMIN_API_CURRENT_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, options, config);
    return { options, document };
  };

  /** Provider Swagger */
  getProviderSwaggerHtml = (config?) => {
    const { document, options } = this.getProviderSwaggerDocument(config);
    const swaggerUi = loadPackage('swagger-ui-express', 'SwaggerModule', () =>
      require('swagger-ui-express'),
    );
    const swaggerHtml = swaggerUi.generateHTML(document, options);
    const yamlString: string = YAML.stringify(document);
    // fs.writeFileSync('./swagger-admin.yaml', yamlString);
    return swaggerHtml;
  };
  getProviderSwaggerDocument = (config?) => {
    const options = new DocumentBuilder()
      .setTitle(SWAGGER_PROVIDER_API_NAME)
      .setDescription(SWAGGER_PROVIDER_API_DESCRIPTION)
      .setVersion(SWAGGER_PROVIDER_API_CURRENT_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, options, config);
    return { options, document };
  };

  /**TvApp Swagger */
  getTvAppSwaggerHtml = (config?) => {
    const { document, options } = this.getTvAppSwaggerDocument(config);
    const swaggerUi = loadPackage('swagger-ui-express', 'SwaggerModule', () =>
      require('swagger-ui-express'),
    );
    const swaggerHtml = swaggerUi.generateHTML(document, options);
    const yamlString: string = YAML.stringify(document);
    // fs.writeFileSync('./swagger-admin.yaml', yamlString);
    return swaggerHtml;
  };
  getTvAppSwaggerDocument = (config?) => {
    const options = new DocumentBuilder()
      .setTitle(SWAGGER_TVAPP_API_NAME)
      .setDescription(SWAGGER_TVAPP_API_DESCRIPTION)
      .setVersion(SWAGGER_TVAPP_API_CURRENT_VERSION)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(this.app, options, config);
    return { options, document };
  };

  /**Mobile Swagger */
  getMobileSwaggerHtml = (config?) => {
    const { document, options } = this.getMobileSwaggerDocument(config);
    const swaggerUi = loadPackage('swagger-ui-express', 'SwaggerModule', () =>
      require('swagger-ui-express'),
    );
    const swaggerHtml = swaggerUi.generateHTML(document, options);
    const yamlString: string = YAML.stringify(document);
    // fs.writeFileSync('./swagger-admin.yaml', yamlString);
    return swaggerHtml;
  };
  getMobileSwaggerDocument = (config?) => {
    const options = new DocumentBuilder()
      .setTitle(SWAGGER_MOBILE_API_NAME)
      .setDescription(SWAGGER_MOBILE_API_DESCRIPTION)
      .setVersion(SWAGGER_MOBILE_API_CURRENT_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(this.app, options, config);
    return { options, document };
  };
}
