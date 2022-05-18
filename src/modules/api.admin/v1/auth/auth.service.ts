import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'modules/config';
import { User } from 'modules/entities/user.entity';
import { UserAuthorityMapping } from 'modules/entities/userAuthorityMapping.entity';
import { UsersService } from 'modules/user';
import { Repository } from 'typeorm';
import { Hash } from 'utils/Hash';
import { LoginPayload } from './login.payload';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    @InjectRepository(UserAuthorityMapping)
    private readonly userAuthorityMappingService: Repository<UserAuthorityMapping>,
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
      throw new HttpException(
        { message: 'Invalid credentials!', statusCode: 1001 },
        401,
      );
    }
    return user;
  }

  async validateLoginUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByUserId(payload.userId);
    // 로그인 실패
    if (!user || !Hash.compare(payload.password, user.password)) {
      this.logger.log('Invalid credentials!');
      let message = 'Invalid credentials!';
      if (user) {
        if (user.failCount >= 4) {
          await this.userService.updateUser(
            { id: user.id },
            { status: 'LOCK' },
          );
          message = 'Account has been suspended Connect to Admin';
        } else if (user.failCount === 3) {
          message = 'One more failure and your account will be locked';
        }
        await this.userService.updateUser(
          { id: user.id },
          { failCount: user.failCount + 1 },
        );
      }
      throw new HttpException({ message: message, statusCode: 1001 }, 401);
    }

    // 로그인 성공 예외 처리
    if (user.status === 'LOCK') {
      throw new HttpException(
        {
          message: 'Account has been suspended Connect to Admin',
          statusCode: 1001,
        },
        401,
      );
    }
    if (user.status === 'EXPIRED') {
      throw new HttpException(
        {
          message: 'Change your password',
          statusCode: 1001,
        },
        401,
      );
    }
    await this.userService.updateUser(
      { id: user.id },
      { failCount: 0, lastLoginedAt: new Date() },
    );
    return user;
  }

  async createAuthorityMapping(payload) {
    return await this.userAuthorityMappingService.save(payload);
  }

  async updateAuthorityMapping(criteria, payload) {
    return await this.userAuthorityMappingService.update(criteria, payload);
  }
}
