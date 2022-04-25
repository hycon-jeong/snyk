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
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from 'modules/common/guard/roles.guard';
import { Authority } from 'modules/entities/authority.entity';
import { RoleAuthorityMapping } from 'modules/entities/roleAuthorityMapping.entity';
import { UserAuthorityMapping } from 'modules/entities/userAuthorityMapping.entity';
import { CrudRoleAuthorityMappingService } from './role-authority-mapping.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: RoleAuthorityMapping,
  },
  routes: {
    only: ['getManyBase'],
  },
  query: {
    join: {
      provider: {
        eager: true,
        alias: 'provider',
      },
    },
  },
})
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/admin/v1/role/authority/map')
@ApiTags('roleAuthorityMapping')
export class CrudRoleAuthorityMappingController
  implements CrudController<RoleAuthorityMapping>
{
  constructor(public readonly service: CrudRoleAuthorityMappingService) {}

  get base(): CrudController<RoleAuthorityMapping> {
    return this;
  }
}
