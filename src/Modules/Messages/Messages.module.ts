import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateMessageController } from './Controllers/CreateMessage.controller';
import { CreateMessageService } from './Services/CreateMessage.service';

@Module({
  imports: [HttpModule],
  controllers: [CreateMessageController],
  providers: [CreateMessageService],
})
export class MessagesModule {}
