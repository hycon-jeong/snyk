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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as crypto from 'crypto';
import { TvTestService } from './tv.test.service';
import 'moment-timezone';
import * as moment from 'moment';
moment.tz.setDefault('Asia/Seoul');

import { Between } from 'typeorm';
import { UserMappingService } from 'modules/userMapping/userMapping.service';
import { FirebaseMessagingService } from 'modules/firebase';

export interface IResponse {
  statusCode: number;
  data?: Object;
  isSuccess: boolean;
  message?: string;
}

export enum EventType {
  normal = 'normal',
  important = 'important',
  advertise = 'advertise',
}

@ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller('api/tvapp/test')
@ApiTags('Test')
export class TvTestController {
  constructor(
    private readonly service: TvTestService,
    private firebaseMessage: FirebaseMessagingService,
  ) {}

  @Get('fcm')
  @ApiOperation({
    summary: 'fcm TEST',
  })
  @ApiQuery({
    type: String,
    name: 'deviceToken',
    required: true,
    description: 'tv 기기 토큰',
  })
  @ApiQuery({
    enum: EventType,
    name: 'eventType',
    required: true,
    description: '이벤트 타입(일반,중요,광고)',
  })
  @ApiResponse({
    status: 200,
    description: 'push data',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          isSuccess: true,
          message: 'success',
          data: {
            position: 'center',
            imageUrl:
              'https://mars-sequel.s3.ap-northeast-2.amazonaws.com/images/car-collision+1.png',
            provider: `씽크웨이`,
            redirectUrl: 'https://www.naver.com',
            title: '차량 알림',
            body: '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
            type: 'normal',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getUserListByTvApp(@Query() query): Promise<any> {
    const { deviceToken, eventType } = query;

    const res = await this.firebaseMessage.sendToDevice(deviceToken, {
      // notifction 제거> 백그라운드에서 못 받음
      // notification: {
      //   title: '차량 알림',
      //   body: '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
      // },
      data: {
        position: 'center',
        imageUrl:
          'https://mars-sequel.s3.ap-northeast-2.amazonaws.com/images/car-collision+1.png',
        provider: `씽크웨이`,
        redirectUrl: 'https://www.naver.com',
        title: '차량 알림',
        body: '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
        type: eventType,
      },
    });
    console.log(res);
    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: res,
    };
  }
}
