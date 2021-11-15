import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { EventType } from 'modules/entities';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly mesage: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly provider: number;

  @ApiProperty()
  @IsEnum(EventStatus)
  readonly status: EventStatus;

  @ApiProperty()
  readonly category: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly eventType: EventType;

  @ApiProperty()
  readonly issuedAt: Date;
}
