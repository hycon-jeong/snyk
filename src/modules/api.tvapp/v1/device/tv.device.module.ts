import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { TvDevice } from 'modules/entities/tvDevice.entity';
import { UserModule } from 'modules/user';
import { UserMappingModule } from 'modules/userMapping/userMapping.module';
import { TvDeviceController } from './tv.device.controller';
import { TvDeviceService } from './tv.device.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TvDevice]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserMappingModule,
    UserModule,
  ],
  controllers: [TvDeviceController],
  providers: [TvDeviceService],
  exports: [TvDeviceService],
})
export class TvDeviceModule {}
