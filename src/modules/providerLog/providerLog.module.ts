import { Module, Type } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderLog, User, Event, Provider } from 'modules/entities';
import CrudsProviderService from 'modules/provider/provider.service';
import { CrudProviderLogController } from './providerLog.controller';
import CrudsProviderLogService from './providerLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderLog, User, Event, Provider]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CrudsProviderLogService, CrudsProviderService],
  exports: [CrudsProviderLogService],
  controllers: [CrudProviderLogController],
})
export class ProviderLogModule {}
