import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
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
    // const token = await this.findOne({ user: payload.user, client_id: payload.client_id });
    const token = await this.findOne({ token: payload.token });
    // const token = await (await this.createBuilder({search: {token: payload.token}}, {})).getOne();

    const queryString = await RequestQueryBuilder.create({
      search: {
        $or: [
          {
            client_id: payload.client_id,
          },
          {
            token: payload.token,
          },
        ],
      },
    }).query();

    return token;
  }

  throwBadRequestException(msg?: any): BadRequestException {
    console.log(msg);
    throw new HttpException('Exception has occurred.', 400);
  }
}
