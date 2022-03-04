import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
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
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

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
  importantAdvertise = 'important.advertise',
}

@ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller('api/tvapp/test')
@ApiTags('Test')
export class TvTestController {
  constructor(
    private readonly service: TvTestService,
    private firebaseMessage: FirebaseMessagingService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
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
            subMessage: `씽크웨이`,
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
    let data = {};

    if (eventType === 'normal') {
      data = {
        body: '마이카 알람서비스로부터 차량 시동 알림이 도착하였습니다.',
        imageUrl:
          'https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg',

        position: 'center',
        subMessage: `연결된 장치 : 씽크웨이 / 블랙박스`,
        // redirectUrl: 'https://www.naver.com',
        title: '차량 알림',
        type: eventType,
      };
    }
    if (eventType === 'important') {
      data = {
        body: '마이카 알람서비스로부터 차량 충돌 알림이 도착하였습니다.',
        imageUrl:
          'https://mars-sequel.s3.ap-northeast-2.amazonaws.com/images/car-collision+1.png',

        position: 'center',
        subMessage: `연결된 장치 : 씽크웨이 / 블랙박스`,
        redirectUrl: 'https://www.naver.com',
        title: '차량 알림',
        type: eventType,
      };
    }
    if (eventType === 'advertise') {
      data = {
        body: '마이카 알람서비스로부터 광고 메세지가 도착하였습니다.',
        imageUrl:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Flive.lge.co.kr%2Flg_truesteamtrue_0522%2F&psig=AOvVaw3uI9dl5AXRg41MjqOVuoJK&ust=1645694493986000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjSsfK_lfYCFQAAAAAdAAAAABAY',

        position: 'center',
        subMessage: `연결된 장치 : 씽크웨이 / 블랙박스`,
        redirectUrl: 'https://www.naver.com',
        title: '차량 알림',
        type: eventType,
      };
    }

    const res = await this.firebaseMessage.sendToDevice(deviceToken, {
      // notifction 제거> 백그라운드에서 못 받음
      // notification: {
      //   title: '차량 알림',
      //   body: '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
      // },
      data: { ...data, clickUrl: 'http://localhost:3003' },
    });
    this.logger.debug(res);
    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: res,
    };
  }
}
