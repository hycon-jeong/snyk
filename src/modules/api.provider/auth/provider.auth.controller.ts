import {
  BadRequestException,
  Body,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { EventType } from 'modules/api.tvapp/test/tv.test.controller';
import { CategoryService } from 'modules/category/category.service';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { Event, User } from 'modules/entities';
import CrudsFcmTokenService from 'modules/fcmToken/fcmToken.service';
import { FirebaseMessagingService } from 'modules/firebase';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/provider/provider.service';
import { UsersService } from 'modules/user';
import { UserMappingService } from 'modules/userMapping/userMapping.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PROVIDER_VERSION } from 'swagger/constants';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateProviderUserDto } from './dto/create-user.dto';
import { Roles } from 'modules/common/constants/roles';
import CrudsProviderAuthService from './provider.auth.service';
import { ILamdaReponse } from './type/providerEvent.interface';
import {
  createUserDescriptionHtml,
  createUserSuccessResponse,
} from './swagger/swagger.util';
import {
  CreateRequestErrorResponseDto,
  CreateServerErrorResponseDto,
} from 'swagger/swagger.response';

@ApiBearerAuth()
@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['createOneBase'],
  },
})
@Controller(`api/provider/${PROVIDER_VERSION}/userid`)
@ApiTags('Auth')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CrudProviderAuthController implements CrudController<User> {
  constructor(
    private firebaseMessage: FirebaseMessagingService,
    public readonly service: CrudsProviderAuthService,
    public readonly fcmTokenService: CrudsFcmTokenService,
    public readonly messageService: MessageService,
    public readonly usersService: UsersService,
    public readonly providerService: CrudsProviderService,
    public readonly categoryService: CategoryService,
    public readonly userMappingService: UserMappingService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  get base(): CrudController<User> {
    return this;
  }

  @Override()
  @ApiOperation({
    summary: '마이카 알람서비스 사용자 확인',
  })
  @ApiBody({
    type: CreateProviderUserDto,
    description: createUserDescriptionHtml(),
  })
  @ApiResponse({
    status: 201,
    description: 'Create user successfully',
    type: createUserSuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: CreateRequestErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'server error',
    type: CreateServerErrorResponseDto,
  })
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateProviderUserDto,
  ) {
    const { userKey, providerId } = dto;
    const providerData = await this.providerService.findOne({
      id: providerId,
      status: 'ACTIVE',
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    let user = await this.usersService.findOne({
      userId: userKey,
      providerId,
      status: 'ACTIVE',
    });

    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: { userKey: user?.id },
    };
  }
}
