import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { RolesGuard } from 'modules/auth/roles.guard';
import { Roles } from 'modules/common/constants/roles';
import { RolesAllowed } from 'modules/common/decorator/roles.decorator';
import { User } from 'modules/entities';
import { UsersService } from './user.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'updateOneBase'],
  },
  query: {
    join: {
      userMappings: {
        alias: 'userMapping_query',
        eager: true,
      },
      'userMappings.provider': {
        eager: true,
        alias: 'provider_query',
      },
      'userMappings.consumer': {
        alias: 'consumer_query',
        eager: true,
      },
      provider: {
        alias: 'provider',
        eager: true,
      },
      userAuthorityMappings: {
        alias: 'userAuthorityMapping',
        eager: true,
      },
      'userAuthorityMappings.authority': {
        alias: 'authority',
        eager: true,
      },
      role: {
        alias: 'role',
        eager: true,
      },
    },

    exclude: ['password'],
  },
})
@Controller('api/admin/v1/user')
@ApiTags('user')
@UseGuards(AuthGuard(), RolesGuard)
@RolesAllowed(Roles.ADMIN, Roles.PROVIDER)
export class CrudUserController implements CrudController<User> {
  constructor(public readonly service: UsersService) {}
}
