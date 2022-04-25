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
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from 'modules/common/guard/roles.guard';
import { LogService } from 'modules/common/services/LogService';
import { Provider, User } from 'modules/entities';
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
@Controller('api/admin/v1/provider')
@ApiTags('provider')
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
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

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateProviderDto,
  ) {
    const {
      authPersist: { user },
    } = req.parsed;
    const provider = await this.service.findOne({
      providerCode: dto.providerCode,
    });

    if (provider) {
      throw new BadRequestException('provider code가 중복되었습니다.');
    }

    const newProvider = await this.base.createOneBase(
      req,
      dto as unknown as Provider,
    );
    await this.logService.createSystemLog({
      providerId: newProvider.id,
      actionMessage: `[생성] 유저 : ${user.name} , '${newProvider.providerName}' OEM 생성`,
      actionData: 'OEM',
      userId: user.id,
      rawData: JSON.stringify({
        create: newProvider,
      }),
    });

    return newProvider;
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateProviderDto,
    @Param('id') id,
  ) {
    const {
      authPersist: { user },
    } = req.parsed;
    const provider = await this.service.findOne({
      where: {
        providerCode: dto.providerCode,
        id: Not(id),
      },
    });

    if (provider) {
      throw new BadRequestException('provider code가 중복되었습니다.');
    }
    const _provider = await this.service.findOne({
      where: {
        id: id,
      },
    });
    await this.logService.createSystemLog({
      providerId: id,
      actionMessage: `[수정] 유저 : ${user.name} , '${dto.providerName}' OEM 수정`,
      actionData: 'OEM',
      userId: user.id,
      rawData: JSON.stringify({
        update: {
          before: _provider,
          after: dto,
        },
      }),
    });
    return this.base.updateOneBase(req, dto as unknown as Provider);
  }
}
