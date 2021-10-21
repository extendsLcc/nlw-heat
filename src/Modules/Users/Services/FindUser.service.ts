import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FindUserService {
  constructor(protected readonly prisma: PrismaService) {}

  public async execute(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
