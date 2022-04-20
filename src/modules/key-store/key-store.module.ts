import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyStores } from 'modules/entities/keyStores.entity';
import { User } from 'modules/entities/user.entity';
import { KeyStoreService } from './key-store.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, KeyStores])],
  providers: [KeyStoreService],
  exports: [KeyStoreService],
})
export class KeyStoreModule {}
