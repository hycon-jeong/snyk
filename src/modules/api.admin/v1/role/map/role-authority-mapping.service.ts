import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Provider } from 'modules/entities';
import { Authority } from 'modules/entities/authority.entity';
import { Blocker } from 'modules/entities/blocker.entity';
import { RoleAuthorityMapping } from 'modules/entities/roleAuthorityMapping.entity';
import { UserAuthorityMapping } from 'modules/entities/userAuthorityMapping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrudRoleAuthorityMappingService extends TypeOrmCrudService<RoleAuthorityMapping> {
  constructor(
    @InjectRepository(RoleAuthorityMapping)
    roleAuthorityMappingRepository: Repository<RoleAuthorityMapping>,
  ) {
    super(roleAuthorityMappingRepository);
  }
}
