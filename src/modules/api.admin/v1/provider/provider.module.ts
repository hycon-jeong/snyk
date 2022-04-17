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
import { CrudProviderController } from './provider.controller';
import CrudsProviderService from './provider.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      User,
      UserMapping,
      ProviderLog,
      ProviderEventType,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsProviderService],
  exports: [CrudsProviderService],
  controllers: [CrudProviderController],
})
export class ProviderModule {}
