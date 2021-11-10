import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
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
})
@UseGuards(AuthGuard())
@Controller('api/eventLog')
@ApiTags('eventLog')
export class CrudEventLogController implements CrudController<EventLog> {
  constructor(public readonly service: CrudsEventLogService) {}
}
