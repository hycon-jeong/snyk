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
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from 'modules/common/guard/roles.guard';
import { FcmToken, User } from 'modules/entities';
import { FirebaseMessagingService } from 'modules/firebase';
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
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
@Controller('api/admin/v1/fcm-token')
@ApiTags('fcmToken')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user.id,
    };
  },
})
export class CrudFcmTokenController implements CrudController<FcmToken> {
  constructor(
    public readonly service: CrudsFcmTokenService,
    private firebaseMessage: FirebaseMessagingService,
  ) {}

  get base(): CrudController<FcmToken> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: FcmToken,
  ) {
    const existsFcmToken = await this.service.getExistsToken({
      // user: req.parsed.authPersist.user,
      // client_id: dto.client_id,
      token: dto.token,
    });

    // this.firebaseMessage.subscribeToTopic([dto.token], '/topics/all')
    if (existsFcmToken && existsFcmToken.id) {
      return this.base.updateOneBase(req, {
        ...existsFcmToken,
        ...dto,
        userId: req.parsed.authPersist.user.id,
      });
    } else {
      return this.base.createOneBase(req, {
        ...dto,
        userId: req.parsed.authPersist.user.id,
      });
    }
  }
}
