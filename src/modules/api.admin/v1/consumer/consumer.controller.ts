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
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from 'modules/common/guard/roles.guard';
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
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
})
@Controller('api/admin/v1/consumer')
@ApiTags('consumer')
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
export class CrudConsumerController implements CrudController<Consumer> {
  constructor(
    public readonly service: CrudsConsumerService,
    private readonly logService: LogService,
  ) {}

  get base(): CrudController<Consumer> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateConsumerDto,
  ) {
    const {
      authPersist: { user },
    } = req.parsed;
    const consumer = await this.service.findOne({
      consumerCode: dto.consumerCode,
    });

    if (consumer) {
      throw new BadRequestException('consumer code가 중복되었습니다.');
    }
    const newConsumer = await this.base.createOneBase(req, dto as Consumer);
    await this.logService.createSystemLog(
      {
        consumerId: newConsumer.id,
        actionMessage: `[생성] 유저 : ${user.name} , '${newConsumer.consumerName}' 매체 생성`,
        actionData: 'Consumer',
        userId: user.id,
        rawData: JSON.stringify({
          create: newConsumer,
        }),
      },
      'system.post',
    );

    return newConsumer;
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateConsumerDto,
    @Param('id') id,
  ) {
    const {
      authPersist: { user },
    } = req.parsed;
    const consumer = await this.service.findOne({
      where: {
        consumerCode: dto.consumerCode,
        id: Not(id),
      },
    });

    if (consumer) {
      throw new BadRequestException('consumer code가 중복되었습니다.');
    }
    const _consumer = await this.service.findOne({
      where: {
        id: id,
      },
    });

    await this.logService.createSystemLog(
      {
        consumerId: id,
        actionMessage: `[수정] 유저 : ${user.name} , '${dto.consumerName}' 매체 수정`,
        actionData: 'Consumer',
        userId: user.id,
        rawData: JSON.stringify({
          update: {
            before: _consumer,
            after: dto,
          },
        }),
      },
      'system.patch',
    );

    return this.base.updateOneBase(req, dto as Consumer);
  }
}
