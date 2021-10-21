import { Module } from '@nestjs/common';
import { GithubAuthUserController } from './Controllers/GithubAuthUser.controller';
import { AuthUserController } from './Controllers/AuthUser.controller';
import { AuthService } from './Services/Auth.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from '../Users/User.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtOptions } from './jwt.config';
import { GithubAuthService } from './Services/GithubAuth.service';
import { JwtAuthGuard } from './JwtAuth.guard';
import { JwtStrategy } from './Jwt.strategy';

@Module({
  imports: [
    HttpModule,
    UserModule,
    PassportModule,
    JwtModule.register(jwtOptions),
  ],
  controllers: [GithubAuthUserController, AuthUserController],
  providers: [AuthService, GithubAuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
