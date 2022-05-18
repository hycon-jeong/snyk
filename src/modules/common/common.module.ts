import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockerModule } from 'modules/api.admin/v1/blocker/blocker.module';
import { CrudBlockerService } from 'modules/api.admin/v1/blocker/blocker.service';
import { ConsumerLog, EventLog, ProviderLog, UserLog } from 'modules/entities';
import { Blocker } from 'modules/entities/blocker.entity';
import { Role } from 'modules/entities/role.entity';
import { SystemLog } from 'modules/entities/systemLog.entity';
import { LogService } from './services/LogService';
import { RoleService } from './services/RoleService';
import { ExistsValidator } from './validator/exists.validator';
import { UniqueValidator } from './validator/unique.validator';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from 'modules/config';
import { LogActionType } from 'modules/entities/logActionType.entity';
import { UserModule, UsersService } from 'modules/user';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Blocker,
      UserLog,
      SystemLog,
      EventLog,
      Role,
      LogActionType,
    ]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('SMTP_HOST'),
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
              user: configService.get('SMTP_GOOGLE_AUTH_USER'),
              pass: configService.get('SMTP_GOOGLE_AUTH_PW'),
            },
          },
          defaults: {
            from: '"No Reply" <no-reply@gmail.com>',
          },
        };
      },
    }),
  ],
  providers: [
    UniqueValidator,
    ExistsValidator,
    CrudBlockerService,
    LogService,
    RoleService,
  ],
  exports: [CrudBlockerService, LogService, RoleService],
})
export class CommonModule {}
