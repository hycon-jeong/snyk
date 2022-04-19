import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Unique } from 'modules/common';
import { Roles } from 'modules/common/constants/roles';
import { SameAs } from 'modules/common/validator/same-as.validator';
import { User } from 'modules/entities/user.entity';

export class UpdatePayload {
  @ApiProperty({
    required: true,
  })
  userId: string;

  @ApiProperty({
    required: true,
  })
  providerId: number;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
  })
  password: string;

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
}
