import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from 'modules/config';
import { UsersService } from 'modules/user';
import { KeyStoreService } from 'modules/key-store/key-store.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly keyStoreService: KeyStoreService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate({ iat, exp, id, prm }: JwtPayload, done) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne({
      where: { id },
      relations: [
        'userAuthorityMappings',
        'userAuthorityMappings.authority',
        'role',
      ],
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const keystore = await this.keyStoreService.findforKey(user, prm);

    if (!keystore) {
      throw new HttpException('DuplicatedLogin', 401);
    }

    delete user.password;
    done(null, user);
  }
}
