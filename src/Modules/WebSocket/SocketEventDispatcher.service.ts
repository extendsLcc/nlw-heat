import { Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';

export type EventEmitted = {
  eventName: string;
  payload: any;
};

@Injectable()
export class SocketEventDispatcherService {
  private eventEmitterSubject: Subject<EventEmitted> = new Subject();

  dispatchEvent(event: string, ...payload: any[]) {
    this.eventEmitterSubject.next({
      eventName: event,
      payload: payload,
    });
  }

  getEmittedEventSubject(): Subject<EventEmitted> {
    return this.eventEmitterSubject;
  }
}
