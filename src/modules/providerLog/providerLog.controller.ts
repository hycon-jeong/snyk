import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
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
import { ProviderLog } from 'modules/entities';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import CrudsProviderLogService from './providerLog.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: ProviderLog,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase'],
  },
  query: {
    join: {
      provider: {
        alias: 'provider_query',
        eager: true,
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/providerLog')
@ApiTags('providerLog')
export class CrudProviderLogController implements CrudController<ProviderLog> {
  constructor(
    public readonly service: CrudsProviderLogService,
    public readonly providerService: CrudsProviderService,
  ) {}

  get base(): CrudController<ProviderLog> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ProviderLog,
  ) {
    const providerData = await this.providerService.findOne({
      id: dto.providerId,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    return this.base.createOneBase(req, dto);
  }
}
