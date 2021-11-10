import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EventStatus } from 'modules/common/constants/eventStatus';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly mesage_id: number;

  @ApiProperty()
  @IsEnum(EventStatus)
  readonly status: EventStatus;

  @ApiProperty()
  readonly provider_id: string;

  @ApiProperty()
  readonly provider_code: string;

  @ApiProperty()
  readonly category: string;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly event_type: string;

  @ApiProperty()
  readonly issued_at: Date;
}
