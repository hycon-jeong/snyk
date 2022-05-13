import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from 'modules/common/guard/roles.guard';
import { LogService } from 'modules/common/services/LogService';
import { Provider, User } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Not } from 'typeorm';
import { CrudBlockerService } from './blocker.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Blocker,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
  query: {
    join: {
      provider: {
        alias: 'provider',
        eager: true,
      },
    },
  },
})
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/admin/v1/blocker')
@ApiTags('blocker')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CrudBlockerController implements CrudController<Blocker> {
  constructor(
    public readonly service: CrudBlockerService,
    private readonly logService: LogService,
  ) {}

  get base(): CrudController<Blocker> {
    return this;
  }

  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto) {
    const {
      authPersist: { user },
    } = req.parsed;
    const newBlocker = await this.base.createOneBase(req, dto);
    try {
      await this.logService.createUserLog(
        {
          actionMessage: `[생성] 유저 : ${user.name} , '${newBlocker.ipAddress}' 생성`,
          actionData: 'Blocker',
          userId: user.id,
          providerId: user.providerId,
          rawData: JSON.stringify({
            create: newBlocker,
          }),
        },
        'user.post',
      );
    } catch (err) {
      console.log(err);
    }

    return newBlocker;
  }
  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto,
    @Param('id') id,
  ) {
    const {
      authPersist: { user },
    } = req.parsed;
    try {
      const _blocker = await this.service.findOne(id);
      await this.logService.createUserLog(
        {
          actionMessage: `[수정] 유저 : ${user.name} , '${dto.ipAddress}' 수정`,
          actionData: 'Blocker',
          userId: user.id,
          providerId: user.providerId,
          rawData: JSON.stringify({
            update: {
              before: _blocker,
              after: dto,
            },
          }),
        },
        'user.patch',
      );
    } catch (err) {
      console.log(err);
    }

    return this.base.updateOneBase(req, dto);
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest, @Param('id') id) {
    const {
      authPersist: { user },
    } = req.parsed;
    try {
      const blocker = await this.service.findOne(id);
      await this.logService.createUserLog(
        {
          actionMessage: `[삭제] 유저 : ${user.name} , '${blocker.ipAddress}' 삭제`,
          actionData: 'Blocker',
          userId: user.id,
          providerId: user.providerId,
        },
        'user.delete',
      );
    } catch (err) {
      console.log(err);
    }

    return await this.service.updateOne(req, { status: 'INACTIVE' });
  }
}
