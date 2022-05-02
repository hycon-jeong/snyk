import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpsRedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (!req.secure) {
      if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
        next();
      } else {
        const httpsUrl = `https://${req.hostname}${req.originalUrl}`;
        res.redirect(HttpStatus.TEMPORARY_REDIRECT, httpsUrl);
      }
    } else {
      next();
    }
  }
}
