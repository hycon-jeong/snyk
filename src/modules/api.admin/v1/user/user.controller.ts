import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { RolesGuard } from 'modules/auth/roles.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { LogService } from 'modules/common/services/LogService';
import { User } from 'modules/entities';
import { Not } from 'typeorm';
import { AuthService } from '../auth';
import { RegisterPayload } from './register.payload';
import { UpdatePayload } from './update.payload';
import { UsersService } from './user.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
  },
  query: {
    join: {
      userMappings: {
        alias: 'userMapping_query',
        eager: true,
      },
      'userMappings.provider': {
        eager: true,
        alias: 'provider_query',
      },
      'userMappings.consumer': {
        alias: 'consumer_query',
        eager: true,
      },
      provider: {
        alias: 'provider',
        eager: true,
      },
      userAuthorityMappings: {
        alias: 'userAuthorityMapping',
        eager: true,
      },
      'userAuthorityMappings.authority': {
        alias: 'authority',
        eager: true,
      },
      role: {
        alias: 'role',
        eager: true,
      },
    },

    exclude: ['password'],
  },
})
@Controller('api/admin/v1/user')
@ApiTags('user')
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CrudUserController implements CrudController<User> {
  constructor(
    public readonly service: UsersService,
    public readonly authService: AuthService,
    public readonly logService: LogService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterPayload, @Req() req): Promise<any> {
    const { user: userLogined } = req;
    if (payload.email) {
      const checkEmailUser = await this.service.findOne({
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

    const user = await this.service.create({
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
      actionData: 'User',
      actionMessage: `'${user.name}' register by '${userLogined.name}'`,
    });
    return { statusCode: 200, message: 'success' };
  }

  @Patch('update/:id')
  async updateUserWithAuthority(
    @Body() payload: UpdatePayload,
    @Req() req,
    @Param('id') id,
  ): Promise<any> {
    const { user: userLogined } = req;
    const { authorities, ...rst } = payload;

    if (payload.email) {
      const checkEmailUser = await this.service.findOne({
        email: payload.email,
        id: Not(id),
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

    if (payload.userId) {
      const checkUserIdUser = await this.service.findOne({
        userId: payload.userId,
        id: Not(id),
      });
      if (checkUserIdUser && checkUserIdUser.id) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            messageCode: 'auth.userIdDuplicated',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.service.updateUser({ id }, rst);
    const user = await this.service.findOne(id);
    await this.authService.updateAuthorityMapping(
      { userId: user.id, mappingStatus: 'ACTIVE' },
      { mappingStatus: 'INACTIVE' },
    );

    const promArr = authorities.map(async (authorityId) => {
      const dto = {
        authorityId,
        userId: user.id,
        providerId: payload.providerId,
      };
      return this.authService.createAuthorityMapping(dto);
    });
    await Promise.all(promArr);

    await this.logService.createUserLog({
      userId: userLogined.id,
      providerId: userLogined.providerId,
      actionData: 'User',
      actionMessage: `'${user.name}' was updated by '${userLogined.name}'`,
    });

    return { statusCode: 200, message: 'success' };
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest, @Param('id') id) {
    const {
      authPersist: { user },
    } = req.parsed;
    try {
      const _user = await this.service.findOne(id);
      await this.logService.createUserLog({
        actionMessage: `'${_user.name}' was deleted by '${user.name}' 삭제`,
        actionData: 'User',
        userId: user.id,
        providerId: user.providerId,
      });
    } catch (err) {
      console.log(err);
    }
    return await this.service.updateOne(req, { status: 'INACTIVE' });
  }
}
