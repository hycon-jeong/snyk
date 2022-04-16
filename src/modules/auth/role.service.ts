import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Role } from 'modules/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends TypeOrmCrudService<Role> {
  constructor(
    @InjectRepository(Role)
    roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
