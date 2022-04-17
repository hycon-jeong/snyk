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
import { UserAuthorityMapping } from 'modules/entities/userAuthorityMapping.entity';
import { CrudBlockerController } from './authority-mapping.controller';
import { CrudAuthorityMappingService } from './authority-mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuthorityMapping]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudAuthorityMappingService],
  exports: [CrudAuthorityMappingService],
  controllers: [CrudBlockerController],
})
export class AuthorityMappingModule {}
