import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { TvDevice } from 'modules/entities/tvDevice.entity';
import { UserModule } from 'modules/user';
import { UserMappingModule } from 'modules/userMapping/userMapping.module';
import { TvTestController } from './tv.test.controller';
import { TvTestService } from './tv.test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TvDevice]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserMappingModule,
    UserModule,
  ],
  controllers: [TvTestController],
  providers: [TvTestService],
})
export class TvTestModule {}
