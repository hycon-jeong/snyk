import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Event } from 'modules/entities';
import CrudsEventService from './event.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Event,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/event')
@ApiTags('event')
export class CrudEventController implements CrudController<Event> {
  constructor(public readonly service: CrudsEventService) {}
}
