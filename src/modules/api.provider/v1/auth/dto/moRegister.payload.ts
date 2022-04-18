import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Roles } from 'modules/common/constants/roles';

export class MoRegisterPayload {
  @ApiProperty({
    type: String,
    description: 'provider측 사용자 식별번호',
    required: true,
    example: '34634',
  })
  @MinLength(1)
  @IsString()
  userKey: string;

  @ApiProperty({
    type: String,
    description: 'provider 고유 아이디 (마이카 서비스에서 제공)',
    required: true,
    example: 'PVD3344718234',
  })
  @IsNotEmpty()
  providerId: string;
}
