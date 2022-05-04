import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RegisterPayload } from '.';

export class MoUpdatePayload {
  @ApiProperty({
    required: true,
    description: 'user id',
    type: String,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'provider id',
  })
  @IsNotEmpty()
  provider_id: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'consumer id',
  })
  @IsNotEmpty()
  consumer_id: number;

  @ApiProperty({
    required: true,
    type: String,
    description: 'key',
  })
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'name',
  })
  @IsNotEmpty()
  name: string;
}
