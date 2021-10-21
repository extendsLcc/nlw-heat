import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CreateMessageService {
  constructor(protected readonly prisma: PrismaService) {}

  async execute(text: string, userId: string) {
    return await this.prisma.message.create({
      data: {
        text,
        userId,
      },
      include: {
        user: true,
      },
    });
  }
}
