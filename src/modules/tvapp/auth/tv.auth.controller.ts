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
  constructor() {}

  @Get('certCode')
  @ApiQuery({ type: String, name: 'deviceToken', required: true })
  @ApiQuery({ type: String, name: 'tvType', required: true })
  @ApiResponse({ status: 200, description: 'get certCode successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getCerCode(@Query() query): Promise<any> {
    const randomValue = crypto
      .randomInt(100000, 999999)
      .toString()
      .padStart(6, '0');

    return {
      statusCode: 200,
      data: { authCode: randomValue },
      isSuccess: true,
      message: 'success',
    };
  }
}
