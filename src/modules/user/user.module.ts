import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserMapping } from 'modules/entities';
import { UsersService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserMapping]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [UsersService],
  providers: [UsersService],
})
export class UserModule {}
