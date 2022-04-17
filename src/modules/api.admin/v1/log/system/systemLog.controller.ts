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
import { RolesGuard } from 'modules/auth/roles.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { UserLog } from 'modules/entities';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { CrudSystemLogService } from './systemLog.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: SystemLog,
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
@Controller('api/admin/v1/systemLog')
@ApiTags('systemLog')
export class CrudSystemLogController implements CrudController<SystemLog> {
  constructor(public readonly service: CrudSystemLogService) {}

  get base(): CrudController<SystemLog> {
    return this;
  }
}
