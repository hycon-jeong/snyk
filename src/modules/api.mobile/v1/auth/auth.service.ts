import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'modules/config';
import { User } from 'modules/entities/user.entity';
import { UsersService } from 'modules/user';
import { Hash } from 'utils/Hash';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async createToken(user: User, accessTokenKey: string, refreshToken) {
    const curentTime = Math.floor(Date.now() / 1000);
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({
        sub: user.id.toString(),
        iat: curentTime,
        prm: accessTokenKey,
        id: user.id,
      }),
      refreshToken: this.jwtService.sign({
        sub: user.id.toString(),
        iat: curentTime,
        prm: refreshToken,
        id: user.id,
      }),

      user,
    };
  }
}
