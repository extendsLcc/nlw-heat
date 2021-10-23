import { Module } from '@nestjs/common';
import { CreateMessageController } from './Controllers/CreateMessage.controller';
import { CreateMessageService } from './Services/CreateMessage.service';
import { GetLast3MessagesService } from './Services/GetLast3Messages.service';
import { GetLast3MessagesController } from './Controllers/GetLast3Messages.controller';

@Module({
  imports: [],
  controllers: [CreateMessageController, GetLast3MessagesController],
  providers: [CreateMessageService, GetLast3MessagesService],
})
export class MessagesModule {}
