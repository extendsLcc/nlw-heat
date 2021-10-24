import { Test, TestingModule } from '@nestjs/testing';
import { GithubAuthController } from './GithubAuth.controller';

describe('AuthUserController', () => {
  let controller: GithubAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubAuthController],
    }).compile();

    controller = module.get<GithubAuthController>(GithubAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
