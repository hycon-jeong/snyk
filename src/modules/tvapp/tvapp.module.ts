import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvAuthModule } from './auth/tv.auth.module';

@Module({
  imports: [TvAuthModule],
})
export class TvAppModule {}
