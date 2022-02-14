import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvCertCode } from 'modules/entities/tvCertCode.entity';
import { TvAuthController } from './tv.auth.controller';
import { TvAuthService } from './tv.auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TvCertCode]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TvAuthController],
  providers: [TvAuthService],
})
export class TvAuthModule {}
