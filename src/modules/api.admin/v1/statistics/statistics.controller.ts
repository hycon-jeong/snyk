import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConsumerStatistics, TotalStatistics } from './statistics.interface';
import { StatisticsService } from './statistics.service';
import * as moment from 'moment';
import { IpBlockerGuard } from 'modules/common/guard/IpBlocker.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { Roles } from 'modules/common/constants/roles';

enum RankType {
  'user' = 'user',
  'provider' = 'provider',
  'consumer' = 'consumer',
}

/**
 * statistics Controller
 */
@ApiBearerAuth()
@UseGuards(AuthGuard(), IpBlockerGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER, Roles.MANAGER)
@Controller('api/admin/v1/statistics')
@ApiTags('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  /**
   * Retrieves a total statistics data
   * @returns {Promise<TotalStatistics>} queried profile data
   */
  @Get('total')
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getTotal(@Query() query): Promise<TotalStatistics> {
    const { providerId } = query;
    const totalProvider = this.statisticsService.getTotalProvider({
      providerId,
    });
    const totalEvent = this.statisticsService.getTotalEvent({ providerId });
    const totalMessage = this.statisticsService.getTotalMessage({ providerId });
    const totalUser = this.statisticsService.getTotalUser({ providerId });
    const allPromise = await Promise.all([
      totalProvider,
      totalEvent,
      totalMessage,
      totalUser,
    ]);
    return {
      provider: allPromise[0] || 0,
      event: allPromise[1] || 0,
      message: allPromise[2] || 0,
      user: allPromise[3] || 0,
    };
  }

  @Get('user/registering/byDate')
  @ApiQuery({ name: 'startDate', description: 'startDate', type: String })
  @ApiQuery({ name: 'endDate', description: 'endDate', type: String })
  @ApiQuery({
    name: 'providerId',
    description: 'providerId',
    type: String,
    required: false,
  })
  async getUserRegistering(@Query() query): Promise<any> {
    const { providerId, endDate, startDate } = query;
    if (!endDate || !startDate)
      throw new BadRequestException('endDate and startDate is mandantory');
    const res = await this.statisticsService.getUserRegisteringByDate(
      startDate,
      endDate,
      providerId,
    );
    return {
      data: res,
    };
  }

  @Get('total/event/byOEM')
  @ApiQuery({
    name: 'providerId',
    description: 'providerId',
    type: String,
    required: false,
  })
  async getTotalEventByOEM(@Query() query): Promise<any> {
    const { providerId } = query;
    const res = await this.statisticsService.getTotalEventByOEM(providerId);
    return {
      data: res,
    };
  }

  @Get('today/rank')
  @RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
  @ApiQuery({ name: 'today', description: 'today', type: String })
  @ApiQuery({
    name: 'type',
    description: 'rank type in [user,provider,consumer]',
    enum: RankType,
  })
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getTodayRank(@Query() query): Promise<any> {
    const { today, type } = query;
    const startDate = moment(today).subtract(1, 'day').format('YYYY-MM-DD');
    const endDate = moment(today).add(1, 'day').format('YYYY-MM-DD');
    console.log(startDate, endDate);
    let data = [];
    switch (type) {
      case 'user':
        data = await this.statisticsService.getUserRank(
          startDate,
          today,
          endDate,
        );
        break;
      case 'provider':
        data = await this.statisticsService.getProviderRank(
          startDate,
          today,
          endDate,
        );
        break;
      case 'consumer':
        data = await this.statisticsService.getConsumerRank(
          startDate,
          today,
          endDate,
        );
        break;
      default:
        break;
    }
    return data;
  }

  @Get('total/rank')
  @RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
  @ApiQuery({
    name: 'type',
    description: 'rank type in [user,provider,consumer]',
    enum: RankType,
  })
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getTotalRank(@Query() query): Promise<any> {
    const { type } = query;
    let data = [];
    switch (type) {
      case 'user':
        data = await this.statisticsService.getUserTotalRank();
        break;
      case 'provider':
        data = await this.statisticsService.getProviderTotalRank();
        break;
      case 'consumer':
        data = await this.statisticsService.getConsumerTotalRank();
        break;
      default:
        break;
    }
    return data;
  }
}
