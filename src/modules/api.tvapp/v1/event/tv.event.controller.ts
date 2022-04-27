import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as crypto from 'crypto';
import 'moment-timezone';
import * as moment from 'moment';
moment.tz.setDefault('Asia/Seoul');

import { Between } from 'typeorm';
import { UserMappingService } from 'modules/userMapping/userMapping.service';
import { TVAPP_VERSION } from 'swagger/constants';
import { TvEventService } from './tv.event.service';
import { ChangeEventPayload } from './changeEvent.payload';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { Event } from 'modules/entities';
import { TvDeviceService } from '../device/tv.device.service';

export interface IResponse {
  statusCode: number;
  data?: Object;
  isSuccess: boolean;
  message?: string;
}

@Controller(`api/tvapp/v1/event`)
@ApiTags('Event')
export class TvEventController {
  constructor(
    private readonly service: TvEventService,
    private readonly userMappingService: UserMappingService,
    private readonly tvDeviceService: TvDeviceService,
  ) {}

  @Post('/:id/status')
  @ApiOperation({
    summary: '이벤트 상태 변경하기',
    description: '상태값 변경하기',
  })
  @ApiParam({
    type: Number,
    name: 'id',
    required: true,
    description: '이벤트 id ',
  })
  @ApiQuery({
    type: String,
    name: 'deviceToken',
    required: true,
    description: 'tv 기기 토큰',
  })
  @ApiBody({
    type: ChangeEventPayload,
  })
  @ApiResponse({
    status: 200,
    description: 'change event successfully',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          isSuccess: true,
          message: 'success',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          isSuccess: false,
          message: '{에러 내용}',
        },
      },
    },
  })
  async changeEventStatus(
    @Body() body: ChangeEventPayload,
    @Param('id') id,
    @Query() query,
  ): Promise<any> {
    const { deviceToken } = query;
    const { status } = body;
    let device = await this.tvDeviceService.getTvDeviceOne({
      tvDeviceToken: deviceToken,
    });

    if (!device || !device.id) {
      throw new BadRequestException('등록된 tv정보가 없습니다.');
    }
    const userMapping = await this.userMappingService.findOne({
      tvDeviceId: device.id,
      mappingStatus: 'ACTIVE',
    });
    if (!userMapping || !userMapping.id) {
      throw new BadRequestException('등록된 서비스가 없습니다.');
    }

    const payload: Partial<Event> = {
      status,
    };
    switch (status) {
      case EventStatus.COMPLETE:
        payload['completedAt'] = new Date();
        break;

      case EventStatus.RECEIVE:
        payload['receivedAt'] = new Date();
        break;

      case EventStatus.FAIL:
        payload['failedAt'] = new Date();
        break;

      default:
        payload['failedAt'] = new Date();
        break;
    }
    await this.service.update({ id, userMappingId: userMapping.id }, payload);
    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
    };
  }
}
