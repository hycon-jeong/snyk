import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateProviderUserDto {
  @ApiProperty({
    type: String,
    description: 'provider측 사용자 식별번호',
    required: true,
    example: '34634',
  })
  @MinLength(1)
  @IsString()
  readonly userKey: string;

  @ApiProperty({
    type: String,
    description: 'provider 고유 아이디 (마이카 서비스에서 제공)',
    required: true,
    example: 'PVD3344718234',
  })
  readonly providerId: string;
}
