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
import { RolesGuard } from 'modules/auth/roles.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { LogService } from 'modules/common/services/LogService';
import { Consumer, User } from 'modules/entities';
import { Not } from 'typeorm';
import CrudsConsumerService from './consumer.service';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';

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
