import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserService } from './AuthUser.service';

@Controller('/auth')
export class AuthUserController {
  constructor(protected authUserService: AuthUserService) {}

  @Post('')
  async authenticateUser(@Body('code') code: string) {
    return await this.authUserService.execute(code);
  }
}
