import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConsumerStatistics, TotalStatistics } from './statistics.interface';
import { StatisticsService } from './statistics.service';

/**
 * statistics Controller
 */
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('api/statistics')
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
  async getTotal(): Promise<TotalStatistics> {
    const totalConsumer = this.statisticsService.getTotalConsumer();
    const totalProvider = this.statisticsService.getTotalProvider();
    const totalEvent = this.statisticsService.getTotalEvent();
    const totalMessage = this.statisticsService.getTotalMessage();
    const totalUser = this.statisticsService.getTotalUser();
    const allPromise = await Promise.all([
      totalConsumer,
      totalProvider,
      totalEvent,
      totalMessage,
      totalUser,
    ]);
    return {
      consumer: allPromise[0] || 0,
      provider: allPromise[1] || 0,
      event: allPromise[2] || 0,
      message: allPromise[3] || 0,
      user: allPromise[4] || 0,
    };
  }
}
