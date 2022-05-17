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
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { Roles } from 'modules/common/constants/roles';
import { RolesGuard } from 'modules/common/guard/roles.guard';
import { RoleService } from 'modules/common/services/RoleService';

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
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly roleService: RoleService,
  ) {}

  /**
   * Retrieves a total statistics data
   * @returns {Promise<TotalStatistics>} queried profile data
   */
  @Get('total')
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getTotal(@Query() query): Promise<TotalStatistics> {
    const { providerId } = query;
    const role = await this.roleService.findOne({ code: 'USER' });
    const totalProvider = this.statisticsService.getTotalProvider({
      providerId,
    });
    const totalEvent = this.statisticsService.getTotalEvent({ providerId });
    const totalMessage = this.statisticsService.getTotalMessage({ providerId });
    const totalUser = this.statisticsService.getTotalUser({
      providerId,
      roleId: role.id,
    });
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
  @ApiQuery({
    name: 'providerId',
    description: 'providerId',
    type: String,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getTodayRank(@Query() query): Promise<any> {
    const { today, type, providerId } = query;
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
          providerId,
        );
        break;
      case 'provider':
        data = await this.statisticsService.getProviderRank(
          startDate,
          today,
          endDate,
          providerId,
        );
        break;
      case 'consumer':
        data = await this.statisticsService.getConsumerRank(
          startDate,
          today,
          endDate,
          providerId,
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
  @ApiQuery({
    name: 'providerId',
    description: 'providerId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    description: 'start date',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    description: 'end date',
    type: String,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Fetch Profile Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Profile Request Failed' })
  async getTotalRank(@Query() query): Promise<any> {
    const { type, providerId, startDate, endDate } = query;
    const role = await this.roleService.findOne({ code: Roles.USER });

    const result = {};
    switch (type) {
      case 'user':
        result['eventType'] =
          await this.statisticsService.getUserEventCountGroupByEventType(
            role.id,
            providerId,
            startDate,
            endDate,
          );
        result['rank'] = await this.statisticsService.getUserTotalRank(
          role.id,
          providerId,
          startDate,
          endDate,
        );
        break;
      case 'provider':
        result['rank'] = await this.statisticsService.getProviderTotalRank(
          providerId,
          startDate,
          endDate,
        );
        result['eventType'] =
          await this.statisticsService.getProviderEventCountGroupByEventType(
            providerId,
            startDate,
            endDate,
          );
        break;
      case 'consumer':
        result['rank'] = await this.statisticsService.getConsumerTotalRank(
          providerId,
          startDate,
          endDate,
        );
        result['eventType'] =
          await this.statisticsService.getConsumerEventCountGroupByEventType(
            providerId,
            startDate,
            endDate,
          );
        break;
      default:
        break;
    }
    return result;
  }

  // dashboard
  @Get('/event/byMinutes')
  @ApiQuery({
    name: 'providerId',
    description: 'providerId',
    type: String,
    required: false,
  })
  async getEventCount(@Query() query): Promise<any> {
    const currDate = moment().utc();
    const endDate = currDate.format('YYYY-MM-DD HH:mm:ss');
    const startDate = currDate
      .subtract(10, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss');
    const start60Date = currDate
      .subtract(60, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss');
    const { providerId } = query;
    const last10m = await this.statisticsService.getProviderApiCallsByRange({
      startDate,
      endDate,
      providerId,
    });
    const last60m = await this.statisticsService.getProviderApiCallsByRange({
      startDate: start60Date,
      endDate,
      providerId,
    });
    return {
      statusCode: 200,
      isSuccess: true,
      message: 'success',
      data: {
        list: last10m,
        list60: last60m,
      },
    };
  }
}
