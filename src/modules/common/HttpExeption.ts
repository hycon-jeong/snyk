import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly _i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const errorData = exception.getResponse() as Record<string, any>;
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (errorData.message && errorData.message.length > 0) {
      return response.status(status).send({ ...errorData, isSuccess: false });
    }
    let message;
    if (typeof errorData === 'object') {
      message = await this._i18n.translate(errorData?.messageCode, {
        lang: ctx.getRequest().i18nLang,
      });
    }
    message = errorData;
    response.status(status).send({
      message,
      statusCode: status,
      error: errorData.error,
      messageCode: errorData.messageCode,
      isSuccess: false,
    });
  }
}
