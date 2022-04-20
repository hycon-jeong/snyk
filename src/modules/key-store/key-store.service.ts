import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'modules/entities/user.entity';
import { KeyStores } from 'modules/entities/keyStores.entity';

@Injectable()
export class KeyStoreService {
  constructor(
    @InjectRepository(KeyStores)
    private readonly keyStoreRepository: Repository<KeyStores>,
  ) {}

  async findforKey(client: User, key: string): Promise<KeyStores | null> {
    return this.keyStoreRepository.findOne({
      userId: client.id,
      primaryKey: key,
    });
  }

  async remove(id: number): Promise<KeyStores | null> {
    const keyStore = await this.keyStoreRepository.findOneOrFail(id);
    if (!keyStore.id) {
      throw new BadRequestException('keyStore not found');
    }
    await this.keyStoreRepository.update(id, {});
    return await this.keyStoreRepository.findOne(id);
  }

  async find(
    client: User,
    primaryKey: string,
    secondaryKey: string,
  ): Promise<KeyStores | null> {
    return this.keyStoreRepository.findOne({
      userId: client.id,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
    });
  }

  async create(
    client: User,
    primaryKey: string,
    secondaryKey: string,
  ): Promise<KeyStores> {
    const keystore = await this.keyStoreRepository.save({
      userId: client.id,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
    });
    return keystore;
  }
}
