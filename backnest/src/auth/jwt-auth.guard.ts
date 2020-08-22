import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // console.log('\n info', info.toString(),'\n')
    // const error = info.toString().split(':')
    if (err || !user) {
      return { JsonWebTokenError: 'invalid signature' }
    }
    return user
  }
}