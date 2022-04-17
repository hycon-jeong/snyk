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
import { Blocker } from 'modules/entities/blocker.entity';
import { CrudBlockerController } from './blocker.controller';
import { CrudBlockerService } from './blocker.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blocker]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudBlockerService],
  exports: [CrudBlockerService],
  controllers: [CrudBlockerController],
})
export class BlockerModule {}
