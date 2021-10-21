import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GithubAuthService } from './GithubAuth.service';
import { CreateUserService } from '../../Users/Services/CreateUser.service';
import { JwtService } from '@nestjs/jwt';

export type userPayload = {
  name: string;
  avatarUrl: string;
  id: string;
};

@Injectable()
export class AuthService {
  protected readonly GITHUB_ACCESS_TOKEN_URL =
    'https://github.com/login/oauth/access_token';
  protected readonly GITHUB_USER_URL = 'https://api.github.com/user';

  constructor(
    protected prisma: PrismaService,
    protected githubAuthService: GithubAuthService,
    protected createUserService: CreateUserService,
    protected jwtService: JwtService,
  ) {}

  public async execute(code: string) {
    const {
      id: githubId,
      login,
      name,
      avatar_url: avatarUrl,
    } = await this.githubAuthService.getUserDataFromGithub(code);

    let user = await this.getUserByGithubId(githubId);

    if (!user) {
      user = await this.createUserService.execute({
        githubId,
        name,
        login,
        avatarUrl,
      });
    }

    const tokenPayload = {
      user: {
        name: user.name,
        avatarUrl: user.avatarUrl,
        id: user.id,
      },
    };

    const accessToken = this.jwtService.sign(tokenPayload);

    return { accessToken, user };
  }

  private async getUserByGithubId(githubId: number) {
    return await this.prisma.user.findFirst({
      where: {
        githubId,
      },
    });
  }
}
