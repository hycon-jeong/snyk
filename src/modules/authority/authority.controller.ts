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
import { CrudAuthorityService } from './authority.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Authority,
  },
  routes: {
    only: ['getManyBase'],
  },
})
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/authority')
@ApiTags('authority')
export class CrudBlockerController implements CrudController<Authority> {
  constructor(public readonly service: CrudAuthorityService) {}

  get base(): CrudController<Authority> {
    return this;
  }
}
