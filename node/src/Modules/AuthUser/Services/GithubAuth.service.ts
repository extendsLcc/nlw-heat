import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

type AccessTokenResponse = {
  access_token: string;
};

type GithubUser = {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
};

@Injectable()
class GithubAuthService {
  protected readonly GITHUB_ACCESS_TOKEN_URL =
    'https://github.com/login/oauth/access_token';
  protected readonly GITHUB_USER_URL = 'https://api.github.com/user';

  constructor(protected readonly http: HttpService) {}

  public async getUserDataFromGithub(code: string): Promise<GithubUser> {
    const { access_token: accessToken } = await this.getAccessToken(code);

    const { data: githubUserData } = await lastValueFrom(
      this.http.get<GithubUser>(this.GITHUB_USER_URL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    return githubUserData;
  }

  private async getAccessToken(code: string): Promise<AccessTokenResponse> {
    const { data: accessTokenResponse } = await lastValueFrom(
      this.http.post<AccessTokenResponse>(this.GITHUB_ACCESS_TOKEN_URL, null, {
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
    return accessTokenResponse;
  }
}

export { GithubUser, GithubAuthService };
