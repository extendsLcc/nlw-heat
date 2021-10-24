import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Subscription, tap } from 'rxjs';
import {
  SocketEventDispatcherService,
  EventEmitted,
} from './SocketEventDispatcher.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);
  private eventEmitterSubject: Subscription;

  constructor(private readonly eventDispatcher: SocketEventDispatcherService) {}

  afterInit(server: Server) {
    this.logger.log(`${EventsGateway.name} socket started`);
    this.subscribeEventDispatching(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.eventEmitterSubject.unsubscribe();
  }

  private subscribeEventDispatching(server: Server) {
    this.eventEmitterSubject = this.eventDispatcher
      .getEmittedEventSubject()
      .pipe(
        tap(({ eventName, payload }: EventEmitted) => {
          server.emit(eventName, ...payload);
        }),
      )
      .subscribe();
  }
}
