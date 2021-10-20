import { Test, TestingModule } from '@nestjs/testing';
import { GithubAuthUserController } from './GithubAuthUser.controller';

describe('AuthUserController', () => {
  let controller: GithubAuthUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubAuthUserController],
    }).compile();

    controller = module.get<GithubAuthUserController>(GithubAuthUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
