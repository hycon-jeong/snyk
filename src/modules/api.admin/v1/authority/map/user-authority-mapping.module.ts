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
import { CrudUserAuthorityMappingController } from './user-authority-mapping.controller';
import { CrudUserAuthorityMappingService } from './user-authority-mapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuthorityMapping]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudUserAuthorityMappingService],
  exports: [CrudUserAuthorityMappingService],
  controllers: [CrudUserAuthorityMappingController],
})
export class UserAuthorityMappingModule {}
