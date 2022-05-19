import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Provider } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Role } from 'modules/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CrudRoleService extends TypeOrmCrudService<Role> {
  constructor(
    @InjectRepository(Role)
    roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
