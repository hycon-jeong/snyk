import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { Unique } from 'modules/common';
import { Roles } from 'modules/common/constants/roles';
import { Password } from 'modules/common/validator/password.validator';
import { SameAs } from 'modules/common/validator/same-as.validator';
import { User } from 'modules/entities/user.entity';

export class RegisterPayload {
  @ApiProperty({
    required: true,
  })
  @Unique([User])
  userId: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

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

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Password()
  password: string;
}
