import {
  HttpStatus,
  INestApplication,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { loadPackage } from '@nestjs/common/utils/load-package.util';

import * as basicAuth from 'express-basic-auth';
import { AdminV1Module } from 'modules/api.admin/v1/admin.v1.module';
import { ConfigService } from 'modules/config';
import { SwaggerHelper } from 'swagger';

@Injectable()
export class SwaggerTvAppBasicAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: () => void) {
    const heplper = new SwaggerHelper();
    const swaggerHtml = heplper.getTvAppSwaggerHtml();

    basicAuth({
      challenge: true,

      authorizeAsync: true,
      authorizer: (username, password, cb) => {
        const userMatches = basicAuth.safeCompare(username, 'mycaradmin');
        const passwordMatches = basicAuth.safeCompare(password, '1234qwer!');
        if (userMatches && passwordMatches) {
          res.send(swaggerHtml);
        } else {
          cb(null, false);
        }
        // cb(null, true);
      },
    })(req, res, next);
  }
}
