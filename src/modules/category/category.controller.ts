import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Category, User } from 'modules/entities';
import { CategoryService } from './category.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Category,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
  query: {
    join: {
      user: {
        eager: true,
        alias: 'user_category_query',
        exclude: ['password'],
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/category')
@ApiTags('category')
@CrudAuth({
  property: 'user',
  persist: (user: User) => {
    return {
      user: user,
    };
  },
})
export class CategoryController implements CrudController<Category> {
  constructor(public readonly service: CategoryService) {}

  get base(): CrudController<Category> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Category,
  ) {
    let user: User = req.parsed?.authPersist?.user;
    return this.base.createOneBase(req, {
      ...dto,
      user: user,
    } as Category);
  }
}
