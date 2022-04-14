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

  @Override()
  @UseGuards(AuthGuard())
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
    await this.logService.createConsumerLog({
      consumerId: newConsumer.id,
      message: `[생성] 유저 : ${user.name} , '${newConsumer.consumerName}' 매체 생성`,
    });

    return newConsumer;
  }

  @Override()
  @UseGuards(AuthGuard())
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

    await this.logService.createConsumerLog({
      consumerId: id,
      message: `[수정] 유저 : ${user.name} , '${dto.consumerName}' 매체 수정`,
    });

    return this.base.updateOneBase(req, dto as Consumer);
  }
}
