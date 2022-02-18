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
import * as moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ko';

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
  @ApiQuery({ type: String, name: 'tvType', required: false })
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
    console.log('deviceToken >>>>>>>>>>' + deviceToken);

    const certCode = await this.getUniqueCertCode();
    console.log('certCode >>>>>>>>>>' + certCode);
    const expireDt = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    const res = await this.service.createTvCertCode({
      tvCertCode: certCode,
      expireDt: expireDt,
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
    const expireDt = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    const res = await this.service.getTvCertCodeOne({
      tvCertCode: randomValue,
      expireDt: Between(now, expireDt),
    });

    if (res) {
      return this.getUniqueCertCode();
    }
    return randomValue;
  }
}
