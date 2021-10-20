import { Module } from '@nestjs/common';
import { GithubAuthUserController } from './GithubAuthUser.controller';
import { AuthUserController } from './AuthUser.controller';
import { AuthUserService } from './AuthUser.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GithubAuthUserController, AuthUserController],
  providers: [AuthUserService],
})
export class AuthUserModule {}
