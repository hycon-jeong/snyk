import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Unique } from 'modules/common';
import { Roles } from 'modules/common/constants/roles';
import { Password } from 'modules/common/validator/password.validator';
import { SameAs } from 'modules/common/validator/same-as.validator';
import { User } from 'modules/entities/user.entity';

export class ChangePwPayload {
  @ApiProperty({
    required: true,
  })
  userId: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Password()
  newPassword: string;

  @ApiProperty({ required: true })
  @SameAs('newPassword')
  newPasswordConfirmation: string;
}
