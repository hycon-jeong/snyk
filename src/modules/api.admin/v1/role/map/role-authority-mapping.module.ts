import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleAuthorityMapping } from 'modules/entities/roleAuthorityMapping.entity';
import { CrudRoleAuthorityMappingController } from './role-authority-mapping.controller';
import { CrudRoleAuthorityMappingService } from './role-authority-mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleAuthorityMapping]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudRoleAuthorityMappingService],
  exports: [CrudRoleAuthorityMappingService],
  controllers: [CrudRoleAuthorityMappingController],
})
export class RoleAuthorityMappingModule {}
