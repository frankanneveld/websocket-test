import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, retryWhen, tap, delay } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;
  public message$: ReplaySubject<{}> = new ReplaySubject<{}>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket$ = webSocket({
      url: 'ws://127.0.0.1:3000',
      openObserver: { next: () => console.log('open socket connection') },
      closeObserver: { next: () => this.connect() },
      closingObserver: { next: () => console.log('closing socket connection') }
    });

    this.socket$.pipe(retryWhen( err => err.pipe(delay(4000)))).subscribe(
        message => this.message$.next({ message }),
        () => () => catchError(e => { throw e; }),
        () => console.log('complete and closed')
      );
  }

  public sendMessage(msg: any): void {
    this.socket$.next(msg);
  }
  public close(): void {
    this.socket$.complete();
  }
}
