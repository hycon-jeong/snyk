import {
  BadRequestException,
  Controller,
  Param,
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
import { Provider } from 'modules/entities';
import { Not } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
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
// @UseGuards(AuthGuard())
@Controller('api/provider')
@ApiTags('provider')
export class CrudProviderController implements CrudController<Provider> {
  constructor(public readonly service: CrudsProviderService) {}

  get base(): CrudController<Provider> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateProviderDto,
  ) {
    const provider = await this.service.findOne({
      providerCode: dto.providerCode,
    });

    if (provider) {
      throw new BadRequestException('provider code가 중복되었습니다.');
    }

    return this.base.createOneBase(req, dto as unknown as Provider);
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateProviderDto,
    @Param('id') id,
  ) {
    const provider = await this.service.findOne({
      where: {
        providerCode: dto.providerCode,
        id: Not(id),
      },
    });

    if (provider) {
      throw new BadRequestException('provider code가 중복되었습니다.');
    }
    return this.base.updateOneBase(req, dto as unknown as Provider);
  }
}
