import {
  HttpStatus,
  INestApplication,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from 'modules/config';
import { UsersService } from 'modules/user';
import { SwaggerHelper } from 'swagger';
import { In } from 'typeorm';
import { Hash } from 'utils/Hash';
import { Roles } from '../constants/roles';
import { RoleService } from '../services/RoleService';

@Injectable()
export class SwaggerProviderBasicAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly roleService: RoleService,
  ) {}
  use(req: Request, res: Response, next: () => void) {
    const heplper = new SwaggerHelper();
    const swaggerHtml = heplper.getProviderSwaggerHtml();

    basicAuth({
      challenge: true,
      authorizeAsync: true,
      authorizer: async (username, password, cb) => {
        const roles = await this.roleService.find({
          code: In([Roles.PROVIDER, Roles.ADMIN]),
        });
        const user = await this.userService.findOne({
          userId: username,
          roleId: In(roles.map((role) => role.id)),
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
