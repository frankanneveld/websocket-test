import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public test;
  // public messages$ = this.websocketService.messages$.pipe(
  //   tap( c => console.log(c) )
  // );

  constructor(public websocketService: WebsocketService) {
    // this.websocketService.messages$.subscribe(message => console.log(message));
  }

  ngOnInit(): void {
    console.log('app init');
    this.websocketService.sendMessage('Hello Frank');

  }
}
