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
    only: ['getOneBase', 'getManyBase', 'createOneBase'],
  },
})
@Controller('api/user')
@ApiTags('user')
@UseGuards(AuthGuard(), RolesGuard)
@RolesAllowed(Roles.ADMIN)
export class CrudUserController implements CrudController<User> {
  constructor(public readonly service: UsersService) {}
}
