import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { EventLogEntity } from './eventLog.entity';
import CrudsEventLogService from './eventLog.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: EventLogEntity,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/eventLog')
@ApiTags('eventLog')
export class CrudEventLogController implements CrudController<EventLogEntity> {
  constructor(public readonly service: CrudsEventLogService) {}
}
