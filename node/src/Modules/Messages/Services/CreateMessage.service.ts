import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SocketEventDispatcherService } from '../../WebSocket/SocketEventDispatcher.service';

@Injectable()
export class CreateMessageService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly socketEventDispatcherService: SocketEventDispatcherService,
  ) {}

  async execute(text: string, userId: string) {
    const createdMessage = await this.prisma.message.create({
      data: {
        text,
        userId,
      },
      include: {
        user: true,
      },
    });

    const messageInfo = {
      id: createdMessage.id,
      text: createdMessage.text,
      createdAt: createdMessage.createdAt,
      user: {
        id: createdMessage.user.id,
        name: createdMessage.user.name,
        avatarUrl: createdMessage.user.avatarUrl,
      },
    };

    this.socketEventDispatcherService.dispatchEvent('new_message', messageInfo);

    return createdMessage;
  }
}
