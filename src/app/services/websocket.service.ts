import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { retryWhen, delay, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;
  public message$: ReplaySubject<{}> = new ReplaySubject<{}>();

  constructor() {
    this.socket$ ? this.resetConnection : this.connect();
  }

  private connect(): void {
    this.socket$ = webSocket({
      url: 'ws://127.0.0.1:3000',
      openObserver: { next: () => console.log('open socket connection') },
      closeObserver: { next: () => console.log('close socket connection') },
      closingObserver: { next: () => this.resetConnection() }
    });

    this.socket$.pipe(retryWhen( errors => errors.pipe(delay(4000)))).subscribe(
        message => this.message$.next({ message }),
        () => () => catchError(e => { throw e; }),
        () => console.log('complete and closed')
      );
  }

  private resetConnection(): void {
    this.socket$ = null;
    this.connect();
  }

  public sendMessage(msg: any): void {
    this.socket$.next(msg);
  }
  public close(): void {
    this.socket$.complete();
  }
}
