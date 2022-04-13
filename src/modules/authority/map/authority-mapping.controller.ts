import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { Authority } from 'modules/entities/authority.entity';
import { UserAuthorityMapping } from 'modules/entities/userAuthorityMapping.entity';
import { CrudAuthorityMappingService } from './authority-mapping.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: UserAuthorityMapping,
  },
  routes: {
    only: ['getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
  },
})
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/authority/map')
@ApiTags('authorityMapping')
export class CrudBlockerController
  implements CrudController<UserAuthorityMapping>
{
  constructor(public readonly service: CrudAuthorityMappingService) {}

  get base(): CrudController<UserAuthorityMapping> {
    return this;
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto,
    @Param('id') id,
  ) {
    return await this.service.updateOne(req, { mappingStatus: 'INACTIVE' });
  }
}
