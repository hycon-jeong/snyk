import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Provider } from 'modules/entities';
import CrudsProviderService from './provider.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Provider,
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
@Controller('api/provider')
@ApiTags('provider')
export class CrudProviderController implements CrudController<Provider> {
  constructor(public readonly service: CrudsProviderService) {}
}
