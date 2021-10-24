import { Module } from '@nestjs/common';
import { CreateMessageController } from './Controllers/CreateMessage.controller';
import { CreateMessageService } from './Services/CreateMessage.service';
import { GetLast3MessagesService } from './Services/GetLast3Messages.service';
import { GetLast3MessagesController } from './Controllers/GetLast3Messages.controller';
import { WebSocketModule } from '../WebSocket/WebSocket.module';

@Module({
  imports: [WebSocketModule],
  controllers: [CreateMessageController, GetLast3MessagesController],
  providers: [CreateMessageService, GetLast3MessagesService],
})
export class MessagesModule {}
