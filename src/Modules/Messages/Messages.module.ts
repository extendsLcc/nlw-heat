import { Module } from '@nestjs/common';
import { CreateMessageController } from './Controllers/CreateMessage.controller';
import { CreateMessageService } from './Services/CreateMessage.service';

@Module({
  imports: [],
  controllers: [CreateMessageController],
  providers: [CreateMessageService],
})
export class MessagesModule {}
