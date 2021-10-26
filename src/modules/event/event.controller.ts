import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { EventEntity } from './event.entity';
import CrudsEventService from './event.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: EventEntity,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/eventLog')
@ApiTags('eventLog')
export class CrudEventController implements CrudController<EventEntity> {
  constructor(public readonly service: CrudsEventService) {}
}
