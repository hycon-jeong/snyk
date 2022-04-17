import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from './../../../config';
import { UserModule } from './../../../user';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TvAuthModule } from 'modules/api.tvapp/v1/auth/tv.auth.module';
import 'moment-timezone';
import * as moment from 'moment';
import { ProviderModule } from 'modules/api.mobile/v1/provider';
import { TvDeviceModule } from 'modules/api.tvapp/v1/device/tv.device.module';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'modules/entities/role.entity';
moment.tz.setDefault('Asia/Seoul');

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    UserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            ...(configService.get('JWT_EXPIRATION_TIME')
              ? {
                  expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RoleService,
    { provide: 'MomentWrapper', useValue: moment },
  ],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
