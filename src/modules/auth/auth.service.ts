import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'modules/entities/user.entity';
import { Hash } from '../../utils/Hash';
import { ConfigService } from './../config';
import { UsersService } from './../user';
import { LoginPayload } from './login.payload';

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

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByUserId(payload.userId);
    if (!user || !Hash.compare(payload.password, user.password)) {
      this.logger.log('Invalid credentials!');
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }
}
