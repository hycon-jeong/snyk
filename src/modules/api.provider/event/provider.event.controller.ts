import {
  BadRequestException,
  Body,
  Get,
  Logger,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import CrudsEventService from './provider.event.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Event,
  },
  routes: {
    only: ['createOneBase'],
  },
})
@Controller('api/provider/event')
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
  private logger = new Logger('EventController');
  constructor(
    private firebaseMessage: FirebaseMessagingService,
    public readonly service: CrudsEventService,
    public readonly fcmTokenService: CrudsFcmTokenService,
    public readonly messageService: MessageService,
    public readonly usersService: UsersService,
    public readonly providerService: CrudsProviderService,
    public readonly categoryService: CategoryService,
    public readonly userMappingService: UserMappingService,
  ) {}
  get base(): CrudController<Event> {
    return this;
  }

  @Override()
  @ApiQuery({ type: String, name: 'userKey', required: true })
  @ApiQuery({ type: String, name: 'providerId', required: true })
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateEventDto,
    @Query() query,
  ) {
    const { userKey, providerId } = query;
    const user = await this.usersService.findOne({
      userId: userKey,
      providerId,
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
      throw new BadRequestException('userMappings not found');
    }
    const tokensArray = userMappings.map(
      (item) => item.tvDevice?.tvDeviceToken,
    );
    const messageData = await this.messageService.findOne({
      id: dto.messageId,
    });
    if (!messageData || !messageData.id) {
      throw new BadRequestException('Message not found');
    }
    const providerData = await this.providerService.findOne({
      id: providerId,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    const categoryData = await this.categoryService.findOne({
      id: dto.category,
    });
    if (!categoryData || !categoryData.id) {
      throw new BadRequestException('cagetory not found');
    }
    const subMessage =
      dto.eventType === 'advertise'
        ? '자세한 사항은 상세보기를 눌러주세요.'
        : `연결된 장치 : ${providerData.providerName} / 블랙박스`;

    if (tokensArray && tokensArray.length > 0) {
      this.firebaseMessage.sendToDevice(tokensArray, {
        // notification: {
        //   title: '차량 알림',
        //   body:
        //     dto.messageContent ||
        //     '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
        // },
        data: {
          position: 'center',
          imageUrl:
            dto.imageUrl ||
            'https://mars-sequel.s3.ap-northeast-2.amazonaws.com/images/car-collision+1.png',
          subMessage: subMessage,
          redirectUrl: dto.redirectUrl,
          title: dto.title || '차량 알림',
          body:
            dto.messageContent ||
            '마이카 알람서비스로부터 사고감지 알람이 도착했습니다.',
          type: dto.eventType,
        },
      });
    }

    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: await this.base.createOneBase(req, {
        user_mapping_id: userMappings[0].id,
        category: categoryData,
        status: EventStatus.COMPLETE,
        imageUrl: dto.imageUrl,
        providerKey: '',
        issuedAt: dto.issuedAt ? dto.issuedAt : new Date(),
        provider: providerData,
        messageContent: dto.messageContent,
        message: messageData,
        subMessageContent: subMessage,
      } as Event),
    };
  }

  @Post('test')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async test(@Req() req, @Body() body): Promise<any> {
    console.log(body, req?.headers);
    return {
      isSuccess: true,
    };
  }
}
