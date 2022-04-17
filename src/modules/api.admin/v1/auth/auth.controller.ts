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
import { AuthService, LoginPayload, RegisterPayload } from '.';
import { MoRegisterPayload } from './moRegister.payload';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import { TvDeviceService } from 'modules/api.tvapp/v1/device/tv.device.service';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { LogService } from 'modules/common/services/LogService';
import { RoleService } from './role.service';
import { UsersService } from 'modules/user';
import { RolesGuard } from './roles.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';

@Controller('api/admin/v1/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
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
      actionMessage: `'${user.name}' login`,
    });
    return await this.authService.createToken(user);
  }

  @Post('register')
  @UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
  @RolesAllowed(Roles.ADMIN)
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload, @Req() req): Promise<any> {
    const { user: userLogined } = req;
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
    });
    const promArr = payload.authorities.map(async (authorityId) => {
      const dto = {
        authorityId,
        userId: user.id,
        providerId: user.providerId,
      };
      return this.authService.createAuthorityMapping(dto);
    });
    await Promise.all(promArr);

    await this.logService.createUserLog({
      userId: userLogined.id,
      providerId: userLogined.providerId,
      actionData: 'Sign Up',
      actionMessage: `'${user.name}' sign up by '${userLogined.name}'`,
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
      actionMessage: `'${user.name}' logout`,
    });
    return {};
  }

  generateUserKey() {
    const prefix = 'MYCAR';
    const datetime = Date.now();
    return prefix + datetime;
  }
}
