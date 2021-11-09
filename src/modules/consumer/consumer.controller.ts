import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Consumer } from 'modules/entities';
import CrudsConsumerService from './consumer.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Consumer,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/consumer')
@ApiTags('consumer')
export class CrudConsumerController implements CrudController<Consumer> {
  constructor(public readonly service: CrudsConsumerService) {}
}
