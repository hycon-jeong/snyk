import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { EventType } from 'modules/entities';

// export class UpdateEventDto extends PartialType(CreateEventDto) {}
export class UpdateEventDto {
  @ApiProperty()
  @IsEnum(EventStatus)
  readonly status: EventStatus;

  @ApiProperty()
  readonly category: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly eventTypeId: number;

  @ApiProperty()
  readonly issuedAt: Date;
}
