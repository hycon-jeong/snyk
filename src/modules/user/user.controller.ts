import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
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
@UseGuards(AuthGuard())
@Controller('api/user')
@ApiTags('user')
export class CrudUserController implements CrudController<User> {
  constructor(public readonly service: UsersService) {}
}
