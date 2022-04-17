import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Provider,
  ProviderEventType,
  ProviderLog,
  User,
  UserMapping,
} from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Role } from 'modules/entities/role.entity';
import { CrudRoleController } from './role.controller';
import { CrudRoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudRoleService],
  exports: [CrudRoleService],
  controllers: [CrudRoleController],
})
export class RoleModule {}
