import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { EventType } from 'modules/entities';

// export class UpdateEventDto extends PartialType(CreateEventDto) {}
export class UpdateEventDto {
  @ApiPropertyOptional()
  @IsEnum(EventStatus)
  readonly status: EventStatus;

  @ApiPropertyOptional()
  readonly categoryId: number;

  @ApiPropertyOptional()
  readonly imageUrl: string;

  @ApiPropertyOptional()
  readonly eventTypeId: number;

  @ApiPropertyOptional()
  readonly issuedAt: Date;
}
