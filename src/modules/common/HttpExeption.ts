import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import * as moment from 'moment';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly _i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const errorData = exception.getResponse() as Record<string, any>;
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const issuedAt = moment.utc(new Date());
    if (errorData.message && errorData.message.length > 0) {
      const { error, ...rest } = errorData;
      return response
        .status(status)
        .send({ ...rest, isSuccess: false, issuedAt });
    }
    let message = errorData;
    if (typeof errorData === 'object') {
      message = await this._i18n.translate(errorData?.messageCode, {
        lang: ctx.getRequest().i18nLang,
      });
    }

    response.status(status).send({
      message,
      statusCode: status,
      // error: errorData.error,
      messageCode: errorData.messageCode,
      isSuccess: false,
      issuedAt,
    });
  }
}
