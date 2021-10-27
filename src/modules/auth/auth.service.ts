import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'modules/entities/user.entity';
import { Hash } from '../../utils/Hash';
import { ConfigService } from './../config';
import { UsersService } from './../user';
import { LoginPayload } from './login.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async createToken(user: User) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({
        id: user.id,
        userId: user.userId,
        name: user.name,
      }),
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByUserId(payload.userId);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }
}
