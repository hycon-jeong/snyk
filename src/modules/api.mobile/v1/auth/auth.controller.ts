import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TvAuthService } from 'modules/api.tvapp/v1/auth/tv.auth.service';
import { User } from 'modules/entities/user.entity';
import * as moment from 'moment';

import { LessThan, MoreThan } from 'typeorm';
import { AuthService } from './';
import { MoRegisterPayload } from './moRegister.payload';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import { TvDeviceService } from 'modules/api.tvapp/v1/device/tv.device.service';
import { LogService } from 'modules/common/services/LogService';
import { randomBytes } from 'crypto';
import { KeyStoreService } from 'modules/key-store/key-store.service';
import { RoleService } from 'modules/common/services/RoleService';
import { UsersService } from 'modules/user';
import { CurrentUser } from 'modules/common/decorator/current-user.decorator';
import { MoUpdatePayload } from './moUpdate.payload';

@Controller('api/mobile/v1/auth')
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
    private readonly keyStoreService: KeyStoreService,
  ) {}

  @Post('register/mo')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async moRegister(@Body() payload: MoRegisterPayload): Promise<any> {
    const { userId, role, password, tvCertCode, name, ...rest } = payload;
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
        expireDt: MoreThan(moment().utc().toISOString()),
      },
    });

    if (!tvCert || !tvCert.id) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }

    let user = await this.userService.findOne({
      where: { userId: userId, providerId: providerData.id },
    });
    let isFirst = false;

    if (!user) {
      isFirst = true;
      user = await this.userService.moCreate({
        userId,
        roleId: roleData.id,
        password,
        // tvCertCode,
        status: 'ACTIVE',
        providerId: providerData.id,
        userKey: this.generateUserKey(),
        name: name,
      });
    }

    if (user.status === 'INACTIVE') {
      isFirst = true;
      await this.userService.updateUser(
        { id: user.id },
        {
          userId,
          roleId: roleData.id,
          password,
          // tvCertCode,
          status: 'ACTIVE',
          providerId: providerData.id,
          userKey: this.generateUserKey(),
          name: name,
          // name: providerData.providerName + '_' + Date.now(),
        },
      );
      user.status = 'ACTIVE';
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
      throw err;
    }
    try {
      await this.tvAuthService.deleteOne(tvCert.id);
    } catch (err) {
      console.log(err);
    }

    return {
      statusCode: 200,
      data: {
        user: user,
        isFirst,
      },
      message: 'success',
      isSuccess: true,
      // accessToken: token.accessToken,
      // expireIn: token.expiresIn,
    };
  }

  @Patch('user/:id')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUser(
    @Body() payload: Partial<MoUpdatePayload>,
    @Param('id') id,
  ): Promise<any> {
    const { name, provider_id, ...rest } = payload;

    if (provider_id) {
      const providerData = await this.providerService.findOne({
        providerCode: payload.provider_id,
      });
      if (!providerData || !providerData.id) {
        throw new BadRequestException('Provider not found');
      }
    }

    await this.userService.updateUser({ id, status: 'ACTIVE' }, payload);

    const user = await this.userService.findOne(id);
    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: {
        user: user,
      },
    };
  }

  generateUserKey() {
    const prefix = 'MYCAR';
    const datetime = Date.now();
    return prefix + datetime;
  }
}
