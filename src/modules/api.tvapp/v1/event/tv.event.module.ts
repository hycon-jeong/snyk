import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'modules/entities';
import { UserModule } from 'modules/user';
import { UserMappingModule } from 'modules/userMapping/userMapping.module';
import { TvDeviceModule } from '../device/tv.device.module';
import { TvEventController } from './tv.event.controller';
import { TvEventService } from './tv.event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserMappingModule,
    TvDeviceModule,
  ],
  controllers: [TvEventController],
  providers: [TvEventService],
  exports: [TvEventService],
})
export class TvEventModule {}
