import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { EventStatus } from 'modules/common/constants/eventStatus';

export class ChangeEventPayload {
  @ApiProperty({ enum: EventStatus, required: true })
  @IsNotEmpty()
  @IsEnum(EventStatus, { each: true })
  status: EventStatus;
}
