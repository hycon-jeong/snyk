import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import CrudsConsumerService from 'modules/consumer/consumer.service';
import { UserMapping, Event, User, Provider, Consumer } from 'modules/entities';
import CrudsProviderService from 'modules/provider/provider.service';
import { UsersService } from 'modules/user';
import { TvAuthController } from './tv.auth.controller';
import { UserMappingService } from './tv.auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TvAuthController],
  providers: [],
})
export class TvAuthModule {}
