import {
  Controller,
  Get,
  Query,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from '../JwtAuth.guard';

@Controller('/auth')
export class GithubAuthUserController {
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
