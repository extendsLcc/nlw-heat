import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../Services/Auth.service';

@Controller('/auth')
export class AuthUserController {
  constructor(protected authUserService: AuthService) {}

  @Post('')
  async authenticateUser(@Body('code') code: string) {
    return await this.authUserService.execute(code);
  }
}
