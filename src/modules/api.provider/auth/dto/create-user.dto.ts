import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateProviderUserDto {
  @ApiProperty({
    type: String,
    description: 'provider측 사용자 식별번호',
    required: true,
  })
  @MinLength(1)
  @IsString()
  readonly userKey: string;

  @ApiProperty({
    type: Number,
    description: 'provider 고유 아이디 (마이카 서비스에서 제공)',
    required: true,
  })
  readonly providerId: number;
}
