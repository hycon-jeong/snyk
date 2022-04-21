import { ApiPropertyOptional } from '@nestjs/swagger';

// export class UpdateUserMappingDto extends PartialType(CreateUserMappingDto) {}
export class UpdateUserMappingDto {
  @ApiPropertyOptional()
  readonly key: string;

  @ApiPropertyOptional()
  readonly name: string;

  @ApiPropertyOptional()
  readonly mappingStatus: string;

  @ApiPropertyOptional()
  readonly userId: number;

  @ApiPropertyOptional()
  readonly consumerId: number;

  @ApiPropertyOptional()
  readonly providerId: number;
}
