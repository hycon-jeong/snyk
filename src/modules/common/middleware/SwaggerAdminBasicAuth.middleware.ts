import {
  HttpStatus,
  INestApplication,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { loadPackage } from '@nestjs/common/utils/load-package.util';

import * as basicAuth from 'express-basic-auth';
import { SwaggerHelper } from 'swagger';
import { UsersService } from 'modules/user';
import { Hash } from 'utils/Hash';
import { RoleService } from '../services/RoleService';
import { Roles } from '../constants/roles';

@Injectable()
export class SwaggerAdminBasicAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly roleService: RoleService,
  ) {}
  async use(req: Request, res: Response, next: () => void) {
    const heplper = new SwaggerHelper();
    const swaggerHtml = heplper.getAdminSwaggerHtml();
    basicAuth({
      challenge: true,
      authorizeAsync: true,
      authorizer: async (username, password, cb) => {
        const role = await this.roleService.findOne({ code: Roles.ADMIN });
        const user = await this.userService.findOne({
          userId: username,
          roleId: role.id,
        });

        if (user && Hash.compare(password, user.password)) {
          res.send(swaggerHtml);
        } else {
          cb(null, false);
        }
      },
    })(req, res, next);
  }
}
