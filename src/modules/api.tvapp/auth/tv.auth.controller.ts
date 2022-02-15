import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as crypto from 'crypto';
import { TvAuthService } from './tv.auth.service';
import 'moment-timezone';
import * as moment from 'moment';
moment.tz.setDefault('Asia/Seoul');

import { Between } from 'typeorm';
import { TvDeviceService } from '../device/tv.device.service';

export interface IResponse {
  statusCode: number;
  data?: Object;
  isSuccess: boolean;
  message?: string;
}

@ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller('api/tvapp/auth')
@ApiTags('Auth')
export class TvAuthController {
  constructor(
    private readonly service: TvAuthService,
    private readonly tvDeviceService: TvDeviceService,
  ) {}

  @Get('certCode')
  @ApiOperation({
    summary: '인증코드 가져오기',
  })
  @ApiQuery({ type: String, name: 'deviceToken', required: true })
  @ApiQuery({ type: String, name: 'tvType', required: true })
  @ApiResponse({ status: 200, description: 'get certCode successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getCerCode(@Query() query): Promise<any> {
    const { deviceToken, tvType } = query;

    // check devicetoken
    let device = await this.tvDeviceService.getTvDeviceOne({
      tvDeviceToken: deviceToken,
    });
    if (!device) {
      device = await this.tvDeviceService.createTvDevice({
        tvType,
        tvDeviceToken: deviceToken,
        status: 'ACTIVE',
      });
    }

    const certCode = await this.getUniqueCertCode();

    await this.service.createTvCertCode({
      tvCertCode: certCode,
      expireDt: moment().add(5, 'minutes').toDate(),
      tvDeviceId: device.id,
    });
    //todo add verfify cod

    return {
      statusCode: 200,
      data: { certCode: certCode },
      isSuccess: true,
      message: 'success',
    };
  }

  async getUniqueCertCode() {
    const randomValue = crypto
      .randomInt(100000, 999999)
      .toString()
      .padStart(6, '0');

    const res = await this.service.getTvCertCodeOne({
      tvCertCode: randomValue,
      expireDt: Between(moment().toDate(), moment().add(5, 'minutes').toDate()),
    });

    if (res) {
      return this.getUniqueCertCode();
    }
    return randomValue;
  }
}
