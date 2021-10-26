import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventRO } from './event.interface';
import { EventService } from './event.service';

@Controller('api/events')
@ApiTags('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getOneEvent(@Param('id') id): Promise<EventRO> {
    return await this.eventService.findOne({ id: id });
  }
}
