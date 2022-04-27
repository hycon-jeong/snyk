import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Provider } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Role } from 'modules/entities/role.entity';
import { In, Repository } from 'typeorm';
import { Roles } from '../constants/roles';

@Injectable()
export class RoleService extends TypeOrmCrudService<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  async getRoleListByCodeList(codeList: Array<Roles>): Promise<Array<Role>> {
    return this.roleRepository.find({
      code: In(codeList),
      status: 'ACTIVE',
    });
  }
}
