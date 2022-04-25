import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import 'moment-timezone';
import * as moment from 'moment';
moment.tz.setDefault('Asia/Seoul');
import { AuthService, LoginPayload } from '.';
import { randomBytes } from 'crypto';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { LogService } from 'modules/common/services/LogService';
import { UsersService } from 'modules/user';
import { ChangePwPayload } from './changePw.payload';
import { KeyStoreService } from 'modules/key-store/key-store.service';
import { RoleService } from 'modules/common/services/RoleService';

@Controller('api/admin/v1/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly logService: LogService,
    private readonly roleService: RoleService,
    private readonly keyStoreService: KeyStoreService,
  ) {}

  @Post('login')
  @UseGuards(IpBlockerGuard)
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);

    const accessTokenKey = randomBytes(64).toString('hex');
    const refreshTokenKey = randomBytes(64).toString('hex');
    await this.keyStoreService.create(user, accessTokenKey, refreshTokenKey);

    await this.logService.createUserLog({
      userId: user.id,
      providerId: user.providerId,
      actionData: 'Login',
      actionMessage: `'${user.name}' login`,
    });
    return await this.authService.createToken(
      user,
      accessTokenKey,
      refreshTokenKey,
    );
  }

  @Get('logout')
  @UseGuards(IpBlockerGuard, AuthGuard())
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Req() req): Promise<any> {
    const { id } = req.user;
    const user = await this.userService.findOne({ id });
    await this.logService.createUserLog({
      userId: user.id,
      providerId: user.providerId,
      actionData: 'Logout',
      actionMessage: `'${user.name}' logout`,
    });
    return {};
  }

  @Post('change/password')
  @UseGuards(IpBlockerGuard)
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(@Body() payload: ChangePwPayload): Promise<any> {
    const user = await this.authService.validateUser({
      userId: payload.userId,
      password: payload.password,
    });

    if (user) {
      await this.userService.updateUser(
        { id: user.id },
        { password: payload.newPassword },
      );
    }

    await this.logService.createUserLog({
      userId: user.id,
      providerId: user.providerId,
      actionData: 'Password',
      actionMessage: `'${user.name}' change password`,
    });
    return {
      statusCode: 200,
      message: 'change password successfully',
    };
  }

  generateUserKey() {
    const prefix = 'MYCAR';
    const datetime = Date.now();
    return prefix + datetime;
  }
}
