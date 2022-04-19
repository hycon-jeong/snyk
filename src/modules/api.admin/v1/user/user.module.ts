import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserMapping } from 'modules/entities';
import { AuthModule, AuthService } from '../auth';
import { CrudUserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserMapping]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [CrudUserController],
})
export class UserModule {}
