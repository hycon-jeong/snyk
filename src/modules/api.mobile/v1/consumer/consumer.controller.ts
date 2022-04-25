import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { LogService } from 'modules/common/services/LogService';
import { Consumer, User } from 'modules/entities';
import { Not } from 'typeorm';
import CrudsConsumerService from './consumer.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Consumer,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
@Controller('api/consumer')
@ApiTags('consumer')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CrudConsumerController implements CrudController<Consumer> {
  constructor(
    public readonly service: CrudsConsumerService,
    private readonly logService: LogService,
  ) {}

  get base(): CrudController<Consumer> {
    return this;
  }
}
