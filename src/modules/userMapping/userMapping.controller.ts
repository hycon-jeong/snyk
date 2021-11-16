import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest
} from '@nestjsx/crud';
import CrudsConsumerService from 'modules/consumer/consumer.service';
import { User, UserMapping } from 'modules/entities';
import CrudsProviderService from 'modules/provider/provider.service';
import { UsersService } from 'modules/user';
import { UserMappingService } from './userMapping.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: UserMapping,
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
      user: {
        eager: true,
        alias: 'user_mapping_query',
        exclude: ['password'],
      },
      provider: {
        eager: true,
        alias: 'user_mapping_provider_query',
        exclude: ['password'],
      },
      consumer: {
        eager: true,
        alias: 'user_mapping_consumer_query',
        exclude: ['password'],
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/user-mapping')
@ApiTags('userMapping')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class UserMappingController implements CrudController<UserMapping> {
  constructor(
    public readonly service: UserMappingService,
    public readonly providerService: CrudsProviderService,
    public readonly consumerService: CrudsConsumerService,
    public readonly userService: UsersService,
  ) {}

  get base(): CrudController<UserMapping> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserMapping,
  ) {
    const providerData = await this.providerService.findOne({
      id: dto.providerId,
    });
    if (!providerData || !providerData.id) {
      throw new BadRequestException('Provider not found');
    }
    const consumerData = await this.consumerService.findOne({
      id: dto.consumerId,
    });
    if (!consumerData || !consumerData.id) {
      throw new BadRequestException('consumer not found');
    }
    const userData = await this.userService.findOne({
      id: dto.userId,
    });
    if (!userData || !userData.id) {
      throw new BadRequestException('user not found');
    }
    return this.base.createOneBase(req, {
      ...dto,
    } as UserMapping);
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserMapping,
  ) {
    if (dto.providerId) {
      const providerData = await this.providerService.findOne({
        id: dto.providerId,
      });
      if (!providerData || !providerData.id) {
        throw new BadRequestException('Provider not found');
      } else {
        dto.provider = providerData;
      }
    }
    if (dto.consumerId) {
      const consumerData = await this.consumerService.findOne({
        id: dto.consumerId,
      });
      if (!consumerData || !consumerData.id) {
        throw new BadRequestException('consumer not found');
      } else {
        dto.consumer = consumerData;
      }
    }
    if (dto.userId) {
      const userData = await this.userService.findOne({
        id: dto.userId,
      });
      if (!userData || !userData.id) {
        throw new BadRequestException('user not found');
      } else {
        dto.user = userData;
      }
    }
    return this.base.updateOneBase(req, dto);
  }
}
