import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GetLast3MessagesService {
  constructor(protected readonly prisma: PrismaService) {}

  async execute() {
    return await this.prisma.message.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
  }
}
