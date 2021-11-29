import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @ApiProperty()
  readonly providerCode: string;

  @IsString()
  @ApiProperty()
  readonly providerName: string;

  @ApiProperty()
  @IsOptional()
  readonly auth: string;

  @ApiProperty()
  @IsOptional()
  readonly providerDomain: string;

  @ApiProperty()
  @IsString()
  readonly providerLogoUrl: string;

  @ApiProperty()
  @IsString()
  readonly providerBackgroundUrl: string;

  @ApiProperty()
  @IsOptional()
  readonly providerMacAddress: string;

  @ApiProperty()
  @IsOptional()
  readonly providerOs: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly providerServerIp: number;

  @ApiProperty()
  @IsOptional()
  readonly providerServerPort: string;

  @ApiProperty()
  @IsOptional()
  readonly providerServerType: string;

  @ApiProperty()
  @IsOptional()
  readonly providerType: string;

  @ApiProperty()
  @IsString()
  readonly status: string;

  @ApiProperty()
  @IsOptional()
  readonly apiEntry: string;
}
