import {
  BadRequestException,
  Body,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
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
import { CategoryService } from 'modules/category/category.service';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { Event, User } from 'modules/entities';
import CrudsFcmTokenService from 'modules/api.admin/v1/fcmToken/fcmToken.service';
import { FirebaseMessagingService } from 'modules/firebase';
import { MessageService } from 'modules/message/message.service';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
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
  checkUserDescriptionHtml,
  createUserSuccessResponse,
  deleteUserDescriptionHtml,
  deleteUserSuccessResponse,
  createUserDescriptionHtml,
} from './swagger/swagger.util';
import {
  CreateRequestErrorResponseDto,
  CreateServerErrorResponseDto,
} from 'swagger/swagger.response';
import { MoRegisterPayload } from './dto/moRegister.payload';
import { generateUserKey } from 'utils/String';
import CrudsConsumerService from 'modules/api.mobile/v1/consumer/consumer.service';
import { randomBytes } from 'crypto';
import { KeyStoreService } from 'modules/key-store/key-store.service';
import { RoleService } from 'modules/common/services/RoleService';
import { AuthService } from 'modules/api.mobile/v1/auth';
import { JwtAuthGuard } from 'modules/common/guard/jwtAuth.guard';

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
    public readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly keyStoreService: KeyStoreService,
    private readonly consumerService: CrudsConsumerService,
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
    description: checkUserDescriptionHtml(),
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
      providerCode: providerId,
      status: 'ACTIVE',
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    let user = await this.usersService.findOne({
      userId: userKey,
      providerId: providerData.id,
      status: 'ACTIVE',
    });

    if (!user || !user.id) {
      throw new BadRequestException('User not found');
    }

    const accessTokenKey = randomBytes(64).toString('hex');
    const refreshTokenKey = randomBytes(64).toString('hex');
    await this.keyStoreService.create(user, accessTokenKey, refreshTokenKey);

    const token = await this.authService.createToken(
      user,
      accessTokenKey,
      refreshTokenKey,
    );

    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: {
        userKey: user?.userKey,
        token: {
          accessToken: token.accessToken,
          expireIn: token.expiresIn,
        },
      },
    };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '마이카 알람서비스 사용자 탈퇴',
    description: deleteUserDescriptionHtml(),
  })
  @ApiQuery({
    type: String,
    name: 'myCarUserKey',
    required: true,
    example: 'MYCAR1647338573154',
  })
  @ApiQuery({
    type: String,
    name: 'providerId',
    required: true,
    example: 'PVD3344718234',
  })
  @ApiResponse({
    status: 200,
    description: 'Delete user successfully',
    type: deleteUserSuccessResponse,
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
  async deleteOne(@ParsedRequest() req: CrudRequest, @Query() query) {
    const { myCarUserKey, providerId } = query;
    const providerData = await this.providerService.findOne({
      providerCode: providerId,
      status: 'ACTIVE',
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    let user = await this.usersService.findOne({
      userKey: myCarUserKey,
      providerId: providerData.id,
      status: 'ACTIVE',
    });

    if (!user || !user.id) {
      throw new BadRequestException('User not found');
    }

    const userMappings = await this.userMappingService.find({
      where: { userId: user.id, mappingStatus: 'ACTIVE' },
    });

    await this.usersService.updateUser({ id: user.id }, { status: 'INACTIVE' });

    const promArr = userMappings.map((map) => {
      return this.userMappingService.updateUserMappings(
        { mappingStatus: 'INACTIVE' },
        { id: map.id },
      );
    });
    await Promise.all(promArr);

    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
    };
  }

  @Post('test/register/mobile')
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
  async moRegister(@Body() payload: MoRegisterPayload): Promise<any> {
    const { userKey: userId, ...rest } = payload;
    const roleData = await this.roleService.findOne({
      code: 'USER',
      status: 'ACTIVE',
    });
    const providerData = await this.providerService.findOne({
      providerCode: payload.providerId,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    console.log(providerData);
    let user = await this.usersService.findOne({
      where: { userId: userId, status: 'ACTIVE', providerId: providerData.id },
    });

    const dummyConsumer = await this.consumerService.findOne();

    if (!user) {
      user = await this.usersService.moCreate({
        userId,
        roleId: roleData.id,
        password: '1234qwer!',
        status: 'ACTIVE',
        providerId: providerData.id,
        userKey: generateUserKey(),
      });
    }
    try {
      // mapping 중복 처리
      const _map = await this.userMappingService.findOne({
        userId: user.id,
        mappingStatus: 'ACTIVE',
        providerId: providerData.id,
        consumerId: dummyConsumer.id,
      });

      if (_map && _map.id) {
        throw new BadRequestException('The user already exists.');
      }
      await this.usersService.createUserMapping({
        userId: user.id,
        mappingStatus: 'ACTIVE',
        providerId: providerData.id,
        consumerId: dummyConsumer.id,
        name: user.name,
        key: userId,
      });
    } catch (err) {
      throw err;
    }

    const accessTokenKey = randomBytes(64).toString('hex');
    const refreshTokenKey = randomBytes(64).toString('hex');
    await this.keyStoreService.create(user, accessTokenKey, refreshTokenKey);
    const token = await this.authService.createToken(
      user,
      accessTokenKey,
      refreshTokenKey,
    );
    return {
      statusCode: 201,
      isSuccess: true,
      message: 'success',
      data: {
        userKey: token.user.userKey,
        token: {
          accessToken: token.accessToken,
          expireIn: token.expiresIn,
        },
      },
    };
  }
}
