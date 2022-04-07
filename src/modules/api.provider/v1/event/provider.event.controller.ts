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
  ApiExcludeEndpoint,
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
import {
  createEventDescriptionHtml,
  createEventHtml,
  createEventSuccessResponse,
} from './swagger/swagger.util';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import CrudsEventService from './provider.event.service';
import {
  CreateRequestErrorResponseDto,
  CreateServerErrorResponseDto,
} from 'swagger/swagger.response';
import { ILamdaReponse } from './type/providerEvent.interface';
import { EventType } from 'modules/api.tvapp/v1/test/tv.test.controller';
import { JwtAuthGuard } from 'modules/auth';

@ApiBearerAuth()
@Crud({
  model: {
    type: Event,
  },
  routes: {
    only: ['createOneBase'],
  },
})
@UseGuards(JwtAuthGuard)
@Controller(`api/provider/${PROVIDER_VERSION}/event`)
@ApiTags('Event')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CrudEventController implements CrudController<Event> {
  constructor(
    private firebaseMessage: FirebaseMessagingService,
    public readonly service: CrudsEventService,
    public readonly fcmTokenService: CrudsFcmTokenService,
    public readonly messageService: MessageService,
    public readonly usersService: UsersService,
    public readonly providerService: CrudsProviderService,
    public readonly categoryService: CategoryService,
    public readonly userMappingService: UserMappingService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}
  get base(): CrudController<Event> {
    return this;
  }

  @Override()
  @ApiOperation({
    summary: '메세지 전송',
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
  @ApiBody({
    type: CreateEventDto,
    description: createEventDescriptionHtml(),
  })
  @ApiResponse({
    status: 201,
    description: 'Post event successfully',
    type: createEventSuccessResponse,
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
    @ParsedBody() dto: CreateEventDto,
    @Query() query,
  ) {
    const { myCarUserKey, providerId } = query;

    const providerData = await this.providerService.findOne({
      providerCode: providerId,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }

    const user = await this.usersService.findOne({
      userKey: myCarUserKey,
      providerId: providerData.id,
      status: 'ACTIVE',
    });
    if (!user || !user.id) {
      throw new BadRequestException('User not found');
    }
    const userMappings = await this.userMappingService.find({
      where: { userId: user.id, mappingStatus: 'ACTIVE' },
      join: {
        leftJoinAndSelect: { tvDevice: 'mapping.tvDevice' },
        alias: 'mapping',
      },
    });

    if (!userMappings.length) {
      throw new BadRequestException('There is no connected tv list');
    }
    const tokensArray = userMappings.map(
      (item) => item.tvDevice?.tvDeviceToken,
    );

    const subMessage =
      dto.eventType === EventType.ADVERTISE || dto.redirectUrl
        ? '자세한 사항은 "상세보기" 버튼을\n 눌러 확인하세요.'
        : // : `연결된 장치 : ${providerData.providerName} / 블랙박스`;
          `연결된 장치 : 현대 소나타`;

    // dto.eventType = EventType.IMPORTANT;

    if (dto.eventType === EventType.ADVERTISE) {
      (dto.eventType as any) = 'advertise';
    }
    if (dto.eventType === EventType.IMPORTANT) {
      (dto.eventType as any) = 'important';
    }
    if (dto.eventType === EventType.INFO) {
      (dto.eventType as any) = 'normal';
    }

    const pushData = {
      position: 'center',
      imageUrl: dto.imageUrl || 'https://i.ibb.co/71YvfCK/image.png',
      subMessage: subMessage,
      redirectUrl: dto.redirectUrl,
      title: dto.messageTitle || '차량 알림',
      body:
        dto.messageContent ||
        '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
      type: dto.eventType,
    };

    if (tokensArray && tokensArray.length > 0) {
      this.firebaseMessage.sendToDevice(tokensArray, {
        data: pushData,
      });
    }
    this.logger.debug(
      `push data from web >>>>>>>>>> ${JSON.stringify(pushData)}`,
    );
    const event = await this.base.createOneBase(req, {
      user_mapping_id: userMappings[0].id,
      // category: categoryData,
      status: EventStatus.COMPLETE,
      imageUrl: dto.imageUrl,
      providerKey: '',
      issuedAt: dto.issuedAt ? dto.issuedAt : new Date(),
      provider: providerData,
      messageContent: dto.messageContent,
      // message: messageData,
      subMessageContent: subMessage,
    } as Event);
    const { messageContent, issuedAt, imageUrl, status } = event;
    return {
      statusCode: 201,
      isSuccess: true,
      message: 'success',
      data: { messageContent, issuedAt, imageUrl, status },
    };
  }

  @Post('push')
  @ApiExcludeEndpoint()
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async generateEvent(@Req() req, @Body() body: ILamdaReponse): Promise<any> {
    this.logger.debug(`data from blackbox >>>>>>>>>> ${JSON.stringify(body)}`);
    const provider = await this.providerService.findOne({
      providerCode: body?.companyid,
    });
    if (!body.companyid || !provider) {
      throw new BadRequestException('회사를 찾을 수 없습니다.');
    }

    const user = await this.usersService.findOne({
      userId: body.userid,
      providerId: provider.id,
      status: 'ACTIVE',
    });
    if (!user || !user.id) {
      throw new BadRequestException('유저를 찾을 수 없습니다.');
    }
    const userMappings = await this.userMappingService.find({
      where: { userId: user.id, mappingStatus: 'ACTIVE' },
      join: {
        leftJoinAndSelect: { tvDevice: 'mapping.tvDevice' },
        alias: 'mapping',
      },
    });

    if (!userMappings.length) {
      throw new BadRequestException('userMappings not found');
    }
    const tokensArray = userMappings.map(
      (item) => item.tvDevice?.tvDeviceToken,
    );

    const data = {
      position: 'center',
      imageUrl: '',
      subMessage: '',
      redirectUrl: body.redirectUrl ? body.redirectUrl : '',
      title: '차량 알림',
      body: '',
      type: 'normal',
    };
    const category = await this.categoryService.findOne({
      id: parseInt(body.msgCode),
    });
    if (!category || !category.id) {
      throw new BadRequestException('유효하지 않은 msgCode입니다.');
    }

    const subMessage = `연결된 장치 : ${provider.providerName} / 블랙박스`;
    // const subMessage = `연결된 장치 : 현대 소나타`;
    data.imageUrl = category.imageUrl;
    data.title = category.title;
    data.body = category.desc;
    data.subMessage = subMessage;
    data.type = category.eventType;

    // push

    if (tokensArray && tokensArray.length > 0) {
      this.firebaseMessage.sendToDevice(tokensArray, {
        data: data,
      });
    }

    this.logger.debug(`push data >>>>>>>>>> ${JSON.stringify(data)}`);

    await Promise.all(
      userMappings.map(async (userMapping) => {
        return await this.service.insertOne({
          user_mapping_id: userMapping.id,
          status: EventStatus.COMPLETE,
          imageUrl: data.imageUrl,
          providerKey: '',
          issuedAt: new Date(),
          messageContent: data.body,
          subMessageContent: data.subMessage,
          category_id: parseInt(body.msgCode),
          message_id: 1,
          provider: provider,
        } as Event);
      }),
    );

    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
    };
  }
}
