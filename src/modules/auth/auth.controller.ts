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
import { TvAuthService } from 'modules/api.tvapp/v1/auth/tv.auth.service';
import { User } from 'modules/entities/user.entity';
import 'moment-timezone';
import * as moment from 'moment';
moment.tz.setDefault('Asia/Seoul');

import { LessThan, MoreThan } from 'typeorm';
import { AuthService, LoginPayload, RegisterPayload } from './';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { UsersService } from './../user';
import { MoRegisterPayload } from './moRegister.payload';
import CrudsProviderService from 'modules/provider/provider.service';
import { TvDeviceService } from 'modules/api.tvapp/v1/device/tv.device.service';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { LogService } from 'modules/common/services/LogService';
import { RoleService } from './role.service';

@Controller('api/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly tvDeviceService: TvDeviceService,
    private readonly tvAuthService: TvAuthService,
    private readonly providerService: CrudsProviderService,
    private readonly logService: LogService,
    private readonly roleService: RoleService,
  ) {}

  @Post('login')
  @UseGuards(IpBlockerGuard)
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);

    await this.logService.createUserLog({
      userId: user.id,
      providerId: user.providerId,
      actionData: 'Login',
      actionMessage: `${user.name} login`,
    });
    return await this.authService.createToken(user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload): Promise<any> {
    const { role } = payload;
    const roleData = await this.roleService.findOne({
      code: role,
      status: 'ACTIVE',
    });

    if (payload.email) {
      const checkEmailUser = await this.userService.findOne({
        email: payload.email,
      });
      if (checkEmailUser && checkEmailUser.id) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            messageCode: 'auth.emailDuplicated',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const user = await this.userService.create({
      ...payload,
      roleId: roleData.id,
    });
    await this.logService.createUserLog({
      userId: user.id,
      providerId: user.providerId,
      actionData: 'Sign Up',
      actionMessage: `${user.name} sign up`,
    });
    return await this.authService.createToken(user);
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
      actionMessage: `${user.name} logout`,
    });
    return {};
  }

  @Post('register/mo')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async moRegister(@Body() payload: MoRegisterPayload): Promise<any> {
    const { userId, role, password, tvCertCode, ...rest } = payload;
    const roleData = await this.roleService.findOne({
      code: role,
      status: 'ACTIVE',
    });
    const providerData = await this.providerService.findOne({
      providerCode: payload.provider_id,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }

    // 인증번호 확인
    const tvCert = await this.tvAuthService.getTvCertCodeOne({
      where: {
        tvCertCode,
        expireDt: MoreThan(moment().format('YYYY-MM-DD HH:mm:ss')),
      },
    });

    if (!tvCert || !tvCert.id) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    let user = await this.userService.findOne({
      where: { userId: userId, status: 'ACTIVE', providerId: providerData.id },
    });

    if (!user) {
      user = await this.userService.moCreate({
        userId,
        roleId: roleData.id,
        password,
        // tvCertCode,
        status: 'ACTIVE',
        providerId: providerData.id,
        userKey: this.generateUserKey(),
      });
    }
    try {
      await this.userService.createUserMapping({
        userId: user.id,
        mappingStatus: 'ACTIVE',
        providerId: providerData.id,
        consumerId: payload.consumer_id,
        tvDeviceId: tvCert.tvDeviceId,
        name: user.name,
        ...rest,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
    const token = await this.authService.createToken(user);
    return {
      accessToken: token.accessToken,
      expireIn: token.expiresIn,
      user: token.user,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('me')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  generateUserKey() {
    const prefix = 'MYCAR';
    const datetime = Date.now();
    return prefix + datetime;
  }
}
