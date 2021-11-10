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
    type: String,
    description: 'provider code',
  })
  @IsNotEmpty()
  providerCode: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'consumer code',
  })
  @IsNotEmpty()
  consumerCode: string;
}
