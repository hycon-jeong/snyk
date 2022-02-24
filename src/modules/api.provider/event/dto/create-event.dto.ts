import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EventStatus } from 'modules/common/constants/eventStatus';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly messageId: number;

  @ApiProperty()
  @IsEnum(EventStatus)
  readonly status: EventStatus;

  @ApiProperty()
  readonly category: number;

  @ApiProperty()
  readonly imageUrl: string;

  @ApiProperty()
  readonly messageContent: string;

  @ApiProperty()
  readonly issuedAt: Date;
}
