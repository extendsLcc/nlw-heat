import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

const createUserDto = Prisma.validator<Prisma.UserArgs>()({
  select: {
    name: true,
    githubId: true,
    avatarUrl: true,
    login: true,
  },
});

type CreateUserDto = Prisma.UserGetPayload<typeof createUserDto>;

@Injectable()
export class CreateUserService {
  constructor(protected readonly prisma: PrismaService) {}

  public async execute(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }
}
