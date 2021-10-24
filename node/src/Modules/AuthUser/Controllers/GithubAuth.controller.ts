import { Controller, Get, Query, Res } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Controller('/auth')
export class GithubAuthController {
  constructor(protected readonly prisma: PrismaService) {}

  @Get('/github')
  public auth(@Res() response) {
    return response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  }

  @Get('/github/signin/callback')
  public callback(@Query('code') code: string) {
    return code;
  }
}
