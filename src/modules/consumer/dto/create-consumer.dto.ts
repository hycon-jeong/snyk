import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateConsumerDto {
  @IsString()
  @ApiProperty()
  readonly consumerCode: string;

  @IsString()
  @ApiProperty()
  readonly consumerName: string;

  @ApiProperty()
  @IsOptional()
  readonly auth: string;

  @ApiProperty()
  @IsOptional()
  readonly consumerDomain: string;

  @ApiProperty()
  @IsString()
  readonly consumerImageUrl: string;

  @ApiProperty()
  @IsOptional()
  readonly consumerMacAddress: string;

  @ApiProperty()
  @IsOptional()
  readonly consumerOs: string;

  @ApiProperty()
  @IsOptional()
  readonly consumerServerIp: string;

  @ApiProperty()
  @IsOptional()
  readonly consumerServerPort: string;

  @ApiProperty()
  @IsOptional()
  readonly consumerServerType: string;

  @ApiProperty()
  @IsOptional()
  readonly consumerType: string;

  @ApiProperty()
  @IsString()
  readonly status: string;

  @ApiProperty()
  @IsOptional()
  readonly apiEntry: string;
}
