import {
  HttpStatus,
  INestApplication,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';

import * as basicAuth from 'express-basic-auth';
import { AdminV1Module } from 'modules/api.admin/v1/admin.v1.module';
import { ConfigService } from 'modules/config';
import { setupAdminSwagger } from 'swagger';

@Injectable()
export class ExpressBasicAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: () => void) {
    console.log(this.configService.get('APP_ENV'));
    // console.log(this.expressInstance)
    console.log('access api document');
    // todo
    // inject service - manage api login
    // setupAdminSwagger(this.expressInstance, {
    //   include: [AdminV1Module],
    //   deepScanRoutes: true,
    // });
    // setupAdminSwagger(expressInstance)

    basicAuth({
      challenge: true,
      users: { mycarAdmin: '1234qwer!' },
      authorizer: (username, password, cb) => {
        console.log(username, password);
        return true;
      },
    })(req, res, next);
  }
}
