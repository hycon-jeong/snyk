import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format } from 'winston';
import * as dotenv from 'dotenv';

dotenv.config();
const { APP_ENV } = process.env;
console.log(APP_ENV);
const logLevel = APP_ENV === 'development' ? 'debug' : 'debug';
const errorLogOptions = {
  file: {
    level: logLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      nestWinstonModuleUtilities.format.nestLike(),
    ),
    filename: './logs/log_error_%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  },
};

const logOptions = {
  file: {
    level: logLevel,
    filename: './logs/log_%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
      }),
      format.prettyPrint(),
    ),
  },
};
export const winstonOptions: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('mycar', {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.DailyRotateFile(logOptions.file),
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile(errorLogOptions.file),
  ],
  exitOnError: false, // do not exit on handled exceptions
};
