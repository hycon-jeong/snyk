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
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Consumer } from 'modules/entities';
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
// @UseGuards(AuthGuard())
@Controller('api/consumer')
@ApiTags('consumer')
export class CrudConsumerController implements CrudController<Consumer> {
  constructor(public readonly service: CrudsConsumerService) {}

  get base(): CrudController<Consumer> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateConsumerDto,
  ) {
    const consumer = await this.service.findOne({
      consumerCode: dto.consumerCode,
    });

    if (consumer) {
      throw new BadRequestException('consumer code가 중복되었습니다.');
    }

    return this.base.createOneBase(req, dto as Consumer);
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateConsumerDto,
    @Param('id') id,
  ) {
    const provider = await this.service.findOne({
      where: {
        consumerCode: dto.consumerCode,
        id: Not(id),
      },
    });

    if (provider) {
      throw new BadRequestException('provider code가 중복되었습니다.');
    }
    return this.base.updateOneBase(req, dto as Consumer);
  }
}
