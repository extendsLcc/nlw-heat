import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken) {
      return false;
    }

    const [, token] = authToken.split(' ');

    try {
      const { sub } = verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return false;
    }

    return undefined;
  }
}
