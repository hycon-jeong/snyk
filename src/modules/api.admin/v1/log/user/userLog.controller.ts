import { Controller, UseGuards } from '@nestjs/common';
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
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from 'modules/common/guard/roles.guard';
import { UserLog } from 'modules/entities';
import { CrudsUserLogService } from './userLog.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: UserLog,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
  query: {
    join: {
      user: {
        alias: 'user',
        eager: true,
      },
    },
  },
})
@UseGuards(IpBlockerGuard, AuthGuard(), RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/admin/v1/userLog')
@ApiTags('userLog')
export class CrudUserLogController implements CrudController<UserLog> {
  constructor(public readonly service: CrudsUserLogService) {}

  get base(): CrudController<UserLog> {
    return this;
  }
}
