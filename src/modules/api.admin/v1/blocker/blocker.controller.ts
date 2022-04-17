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
import { Provider } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Not } from 'typeorm';
import { CrudBlockerService } from './blocker.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Blocker,
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
  query: {
    join: {
      provider: {
        alias: 'provider',
        eager: true,
      },
    },
  },
})
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/admin/v1/blocker')
@ApiTags('blocker')
export class CrudBlockerController implements CrudController<Blocker> {
  constructor(public readonly service: CrudBlockerService) {}

  get base(): CrudController<Blocker> {
    return this;
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto,
    @Param('id') id,
  ) {
    return await this.service.updateOne(req, { status: 'INACTIVE' });
  }
}
