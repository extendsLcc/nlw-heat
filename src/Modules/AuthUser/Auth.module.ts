import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthGuard } from './JwtAuth.guard';
import { jwtOptions } from './jwt.config';
import { JwtStrategy } from './Jwt.strategy';
import { AuthService } from './Services/Auth.service';
import { GithubAuthService } from './Services/GithubAuth.service';
import { UserModule } from '../Users/User.module';
import { AuthUserController } from './Controllers/AuthUser.controller';
import { GithubAuthController } from './Controllers/GithubAuth.controller';

@Module({
  imports: [
    HttpModule,
    UserModule,
    PassportModule,
    JwtModule.register(jwtOptions),
  ],
  controllers: [GithubAuthController, AuthUserController],
  providers: [AuthService, GithubAuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
