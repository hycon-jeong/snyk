import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/user';
import { CrudProviderController } from './provider.controller';
import { ProviderEntity } from './provider.entity';
import CrudsProviderService from './provider.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderEntity, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsProviderService],
  exports: [CrudsProviderService],
  controllers: [CrudProviderController],
})
export class ProviderModule {}
