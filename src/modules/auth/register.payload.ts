import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Roles } from 'modules/common/constants/roles';
import { User } from 'modules/entities/user.entity';
import { Unique } from './../common';
import { SameAs } from './../common/validator/same-as.validator';

export class RegisterPayload {
  @ApiProperty({
    required: true,
  })
  @Unique([User])
  userId: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Roles, required: true })
  @IsNotEmpty()
  @IsEnum(Roles, { each: true })
  role: Roles;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiProperty({ required: true })
  @SameAs('password')
  passwordConfirmation: string;
}
