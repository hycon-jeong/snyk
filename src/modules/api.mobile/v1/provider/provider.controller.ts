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
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { LogService } from 'modules/common/services/LogService';
import { Provider, User } from 'modules/entities';
import { Not } from 'typeorm';

import CrudsProviderService from './provider.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Provider,
  },
  routes: {
    only: ['getOneBase', 'getManyBase'],
  },
})
// @UseGuards(AuthGuard())
@Controller('api/provider')
@ApiTags('provider')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CrudProviderController implements CrudController<Provider> {
  constructor(
    public readonly service: CrudsProviderService,
    private readonly logService: LogService,
  ) {}

  get base(): CrudController<Provider> {
    return this;
  }

  @Get('/code')
  async getProviderByCode(@ParsedRequest() req: CrudRequest, @Query() query) {
    const { providerId } = query;
    const provider = await this.service.findOne({
      providerCode: providerId,
      status: 'ACTIVE',
    });
    if (!provider) {
      throw new BadRequestException('Provider not found');
    }
    return provider;
  }
}
