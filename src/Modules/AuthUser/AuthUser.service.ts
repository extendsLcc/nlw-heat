import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { sign } from 'jsonwebtoken';

type AccessTokenResponse = {
  access_token: string;
};

type UserResponse = {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
};

@Injectable()
export class AuthUserService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly http: HttpService,
  ) {}

  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: accessTokenResponse } = await lastValueFrom(
      this.http.post<AccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      }),
    );

    const { data: userResponse } = await lastValueFrom(
      this.http.get<UserResponse>('https://api.github.com/user', {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`,
        },
      }),
    );

    const { id: githubId, login, name, avatar_url: avatarUrl } = userResponse;

    let user = await this.prisma.user.findFirst({
      where: {
        githubId,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          githubId,
          name,
          login,
          avatarUrl,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatarUrl: user.avatarUrl,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { token, user };
  }
}
