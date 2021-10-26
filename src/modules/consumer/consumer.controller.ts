import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ConsumerEntity } from './consumer.entity';
import CrudsConsumerService from './consumer.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: ConsumerEntity,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/consumer')
@ApiTags('consumer')
export class CrudConsumerController implements CrudController<ConsumerEntity> {
  constructor(public readonly service: CrudsConsumerService) {}
}
