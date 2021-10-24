import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FindUserService } from '../Users/Services/FindUser.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtOptions } from './jwt.config';
import { userPayload } from './Services/Auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private findUserService: FindUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secret,
    });
  }

  async validate(tokenPayload, done) {
    const { iat, exp } = tokenPayload;
    const userPayload: userPayload = tokenPayload.user;
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.findUserService.execute(userPayload.id);

    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}
