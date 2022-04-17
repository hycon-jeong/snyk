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
import { ConsumerLog } from 'modules/entities';
import CrudsConsumerService from 'modules/api.mobile/v1/consumer/consumer.service';
import CrudsConsumerLogService from './consumerLog.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: ConsumerLog,
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
@Controller('api/consumerLog')
@ApiTags('consumerLog')
export class CrudConsumerLogController implements CrudController<ConsumerLog> {
  constructor(
    public readonly service: CrudsConsumerLogService,
    public readonly consumerService: CrudsConsumerService,
  ) {}

  get base(): CrudController<ConsumerLog> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ConsumerLog,
  ) {
    const consumerData = await this.consumerService.findOne({
      id: dto.consumerId,
    });
    if (!consumerData || !consumerData.id) {
      throw new BadRequestException('Consumer not found');
    }
    return this.base.createOneBase(req, dto);
  }
}
