import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ProviderEntity } from './provider.entity';
import CrudsProviderService from './provider.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: ProviderEntity,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/provider')
@ApiTags('provider')
export class CrudProviderController implements CrudController<ProviderEntity> {
  constructor(public readonly service: CrudsProviderService) {}
}
