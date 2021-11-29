import { Controller, UseGuards } from '@nestjs/common';
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
import { UserMappingLog } from 'modules/entities';
import CrudsUserMappingLogService from './userMappingLog.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: UserMappingLog,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase'],
  },
  query: {
    join: {
      consumer: {
        alias: 'consumer_query',
        eager: true,
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/userMappingLog')
@ApiTags('userMappingLog')
export class CrudUserMappingLogController
  implements CrudController<UserMappingLog>
{
  constructor(public readonly service: CrudsUserMappingLogService) {}

  get base(): CrudController<UserMappingLog> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserMappingLog,
  ) {
    return this.base.createOneBase(req, dto);
  }
}
