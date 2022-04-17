import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { RolesGuard } from 'modules/auth/roles.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { Provider } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Role } from 'modules/entities/role.entity';
import { Not } from 'typeorm';
import { CrudRoleService } from './role.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Role,
  },
  routes: {
    only: ['getManyBase'],
  },
  query: {
    join: {
      provider: {
        alias: 'provider',
        eager: true,
      },
    },
  },
})
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/admin/v1/role')
@ApiTags('role')
export class CrudRoleController implements CrudController<Role> {
  constructor(public readonly service: CrudRoleService) {}

  get base(): CrudController<Role> {
    return this;
  }
}
