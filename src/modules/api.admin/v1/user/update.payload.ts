import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Password } from 'modules/common/validator/password.validator';
import { RegisterPayload } from './register.payload';

export class UpdatePayload extends PickType(RegisterPayload, [
  'name',
  'email',
]) {
  @ApiProperty({
    required: true,
  })
  userId: string;

  @ApiProperty({
    required: false,
  })
  @Password()
  @IsOptional()
  password: string;

  @ApiProperty({
    required: true,
  })
  providerId: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    required: true,
    type: [Number],
  })
  @IsNotEmpty()
  authorities: number[];
}
