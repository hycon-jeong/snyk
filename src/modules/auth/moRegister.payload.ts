import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RegisterPayload } from '.';

export class MoRegisterPayload extends PickType(RegisterPayload, [
  'userId',
  'role',
  'password',
]) {
  @ApiProperty({
    required: true,
    type: String,
    description: 'verification code',
  })
  @IsNotEmpty()
  verificationCode: string;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'provider id',
  })
  @IsNotEmpty()
  provider_id: number;

  @ApiProperty({
    required: true,
    type: Number,
    description: 'consumer id',
  })
  @IsNotEmpty()
  consumer_id: number;
}
