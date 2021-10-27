import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapping } from 'modules/entities';
import { User } from '../entities/user.entity';
import { CrudUserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserMapping]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [CrudUserController],
})
export class UserModule {}
