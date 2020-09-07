import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;
  public message$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket$ = webSocket('ws://127.0.0.1:3000');

    this.socket$.subscribe(
      msg => this.message$.next(msg),
      () => catchError(e => { throw e; }),
      () => console.log('complete')
    );
  }

  public sendMessage(msg: any): void {
    this.socket$.next(msg);
  }
  public close(): void {
    this.socket$.complete();
  }
}
