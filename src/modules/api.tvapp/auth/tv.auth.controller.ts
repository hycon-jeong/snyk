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
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { TvAuthService } from './tv.auth.service';
import * as moment from 'moment';
import { Between } from 'typeorm';

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
  constructor(private readonly service: TvAuthService) {}

  @Get('certCode')
  @ApiQuery({ type: String, name: 'deviceToken', required: true })
  @ApiQuery({ type: String, name: 'tvType', required: true })
  @ApiResponse({ status: 200, description: 'get certCode successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getCerCode(@Query() query): Promise<any> {
    const { deviceToken, tvType } = query;

    const certCode = await this.getUniqueCertCode();

    await this.service.createTvCertCode({
      tvCertCode: certCode,
      tvType,
      tvDeviceToken: deviceToken,
      expireDt: moment().add(5, 'minutes').toDate(),
    });
    //todo add verfify code

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
