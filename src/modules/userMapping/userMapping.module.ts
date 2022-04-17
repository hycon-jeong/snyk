import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import CrudsConsumerService from 'modules/api.mobile/v1/consumer/consumer.service';
import { UserMapping, Event, User, Provider, Consumer } from 'modules/entities';
import CrudsProviderService from 'modules/api.mobile/v1/provider/provider.service';
import { UsersService } from 'modules/user';
import { UserMappingController } from './userMapping.controller';
import { UserMappingService } from './userMapping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserMapping, User, Provider, Consumer]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserMappingController],
  providers: [
    UserMappingService,
    CrudsProviderService,
    CrudsConsumerService,
    UsersService,
  ],
  exports: [UserMappingService],
})
export class UserMappingModule {}
