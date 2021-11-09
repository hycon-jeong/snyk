import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FcmToken } from 'modules/entities';
import { Repository } from 'typeorm';

@Injectable()
export default class CrudsFcmTokenService extends TypeOrmCrudService<FcmToken> {
  constructor(
    @InjectRepository(FcmToken)
    fcmTokensRepository: Repository<FcmToken>,
  ) {
    super(fcmTokensRepository);
  }

  async getExistsToken(payload: Partial<FcmToken>): Promise<FcmToken> {
    const token = await this.findOne({ ...payload });
    return token;
  }
}
