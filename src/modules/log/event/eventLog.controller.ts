import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { RolesGuard } from 'modules/auth/roles.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { EventLog } from 'modules/entities';
import CrudsEventLogService from './eventLog.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: EventLog,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
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
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/eventLog')
@ApiTags('eventLog')
export class CrudEventLogController implements CrudController<EventLog> {
  constructor(public readonly service: CrudsEventLogService) {}
}
