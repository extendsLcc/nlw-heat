import { Module } from '@nestjs/common';
import { EventsGateway } from './Events.gateway';
import { SocketEventDispatcherService } from './SocketEventDispatcher.service';

@Module({
  providers: [SocketEventDispatcherService, EventsGateway],
  exports: [EventsGateway, SocketEventDispatcherService],
})
export class WebSocketModule {}
