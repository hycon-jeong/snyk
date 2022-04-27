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
import { TvDeviceService } from './tv.device.service';
import 'moment-timezone';
import * as moment from 'moment';
moment.tz.setDefault('Asia/Seoul');

import { Between } from 'typeorm';
import { UserMappingService } from 'modules/userMapping/userMapping.service';
import { TVAPP_VERSION } from 'swagger/constants';

export interface IResponse {
  statusCode: number;
  data?: Object;
  isSuccess: boolean;
  message?: string;
}

@ApiBearerAuth()
@Controller(`api/tvapp/v1/device`)
@ApiTags('Device')
export class TvDeviceController {
  constructor(
    private readonly service: TvDeviceService,
    private readonly userMappingService: UserMappingService,
  ) {}

  @Get('users')
  @ApiOperation({
    summary: 'tv에 등록된 유저 가져오기',
    description: 'tv deviceToken으로 등록된 유저 리스트 가져오기',
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
    description: 'get user list successfully',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          data: { users: '{유저 리스트}' },
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
  async getUserListByTvApp(@Query() query): Promise<any> {
    const { deviceToken, tvType } = query;

    const device = await this.service.getTvDeviceOne({
      tvDeviceToken: deviceToken,
      tvType,
    });
    if (!device || !device.id) {
      throw new BadRequestException('Tv Device not found');
    }
    const userMappings = await this.userMappingService.find({
      where: { mappingStatus: 'ACTIVE', tvDeviceId: device.id },
      join: { alias: 'mapping', leftJoinAndSelect: { user: 'mapping.user' } },
    });

    return {
      statusCode: 200,
      data: { users: userMappings.map((map) => map.user) },
      isSuccess: true,
      message: 'success',
    };
  }

  @Post('disconnect/user/:id')
  @ApiOperation({
    summary: 'tv에 등록된 유저 해제하기',
    description: '유저 해제하기',
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
  @ApiParam({
    type: Number,
    name: 'id',
    description: 'user pk',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Disconnecting user successfully',
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
  async disconnectUserInTv(@Query() query, @Param('id') userId): Promise<any> {
    const { deviceToken, tvType } = query;

    const device = await this.service.getTvDeviceOne({
      tvDeviceToken: deviceToken,
      tvType,
    });
    if (!device || !device.id) {
      throw new BadRequestException('Tv Device not found');
    }

    const result = await this.userMappingService.updateUserMappings(
      { mappingStatus: 'INACTIVE' },
      { mappingStatus: 'ACTIVE', tvDeviceId: device.id, userId: userId },
    );

    if (!result.affected) {
      throw new BadRequestException('user not found');
    }

    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
    };
  }
}
