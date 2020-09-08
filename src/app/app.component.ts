import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    console.log('app init');
    this.websocketService.sendMessage('Hello Frank');
  }

  public closeSocket():void {
    this.websocketService.close();
  }

  public sendMessage(message: string): void {
    console.log('Send : ', message);
    this.websocketService.sendMessage(message);
  }
}
