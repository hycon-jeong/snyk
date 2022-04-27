import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
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
import { UserMappingService } from 'modules/userMapping/userMapping.service';
import { TVAPP_VERSION } from 'swagger/constants';

export class IResponse {
  statusCode: number;
  data?: Object;
  isSuccess: boolean;
  message?: string;
}

@ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller(`api/tvapp/v1/auth`)
@ApiTags('Auth')
export class TvAuthController {
  constructor(
    private readonly service: TvAuthService,
    private readonly tvDeviceService: TvDeviceService,
    private readonly userMappingService: UserMappingService,
  ) {}

  @Get('certCode')
  @ApiOperation({
    summary: '인증코드 가져오기',
  })
  @ApiQuery({
    type: String,
    name: 'deviceToken',
    required: true,
    description: 'tv 기기 토큰',
  })
  @ApiQuery({
    type: String,
    name: 'tvType',
    required: false,
    description: 'tv 타입',
  })
  @ApiResponse({
    status: 200,
    description: 'get certCode successfully',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          data: {
            certCode: '{인증코드}',
          },
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

  @Get('check')
  @ApiOperation({
    summary: '서비스 연결 확인',
    description: 'tv앱과 서비스 연결 되었는지 확인',
  })
  @ApiQuery({
    type: String,
    name: 'deviceToken',
    required: true,
    description: 'tv 기기 토큰',
  })
  @ApiQuery({
    type: String,
    name: 'tvType',
    required: false,
    description: 'tv 타입',
  })
  @ApiResponse({
    status: 200,
    description: 'Check whether a connection is established or not',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          isSuccess: true,
          message: '서비스가 연결되었습니다.',
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
  async checkAuth(@Query() query): Promise<any> {
    const { deviceToken, tvType } = query;

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
    return {
      statusCode: 200,
      isSuccess: true,
      message: '서비스가 연결되었습니다.',
    };

    //todo add verfify cod
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
