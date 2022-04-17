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
import { Authority } from 'modules/entities/authority.entity';
import { Blocker } from 'modules/entities/blocker.entity';
import { CrudBlockerController } from './authority.controller';
import { CrudAuthorityService } from './authority.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authority]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudAuthorityService],
  exports: [CrudAuthorityService],
  controllers: [CrudBlockerController],
})
export class AuthorityModule {}
