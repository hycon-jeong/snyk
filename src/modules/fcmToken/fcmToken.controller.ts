import { Controller, UseGuards } from '@nestjs/common';
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
import { FcmToken, User } from 'modules/entities';
import CrudsFcmTokenService from './fcmToken.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: FcmToken,
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
})
@UseGuards(AuthGuard())
@Controller('api/fcm-token')
@ApiTags('fcmToken')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    console.log('user ==================== ');
    console.log(user);
    return {
      user: user.id,
    };
  },
})
export class CrudFcmTokenController implements CrudController<FcmToken> {
  constructor(public readonly service: CrudsFcmTokenService) {}

  get base(): CrudController<FcmToken> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: FcmToken,
  ) {
    const existsFcmToken = await this.service.getExistsToken({
      user: req.parsed.authPersist.user,
      client_id: dto.client_id,
    });
    if (existsFcmToken && existsFcmToken.id) {
      return this.base.updateOneBase(req, { ...existsFcmToken, ...dto });
    } else {
      return this.base.createOneBase(req, {
        ...dto,
        user: req.parsed.authPersist.user,
      });
    }
  }
}
