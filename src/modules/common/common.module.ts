import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockerModule } from 'modules/blocker/blocker.module';
import { CrudBlockerService } from 'modules/blocker/blocker.service';
import { Blocker } from 'modules/entities/blocker.entity';
import { IpBlockerGuard } from './guard/IpBlocker.guard';
import { ExistsValidator } from './validator/exists.validator';
import { UniqueValidator } from './validator/unique.validator';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Blocker])],
  providers: [UniqueValidator, ExistsValidator, CrudBlockerService],
  exports: [CrudBlockerService],
})
export class CommonModule {}
