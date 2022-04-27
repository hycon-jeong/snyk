import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    console.log(request.query, user.userKey);
    if (
      request.query &&
      request.query.myCarUserKey &&
      request.query.myCarUserKey !== user.userKey
    ) {
      throw err || new UnauthorizedException();
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
