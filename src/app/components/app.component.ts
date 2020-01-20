import {Component} from '@angular/core';
import {ChatService} from '../services/chat.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {ServerConfigService} from '../services/server.config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'No Traffic';

  private serverUrl = 'http://localhost:8080/socket';
  private stompClient;

  constructor(private chatService: ChatService, private serverConfigService: ServerConfigService) {
    chatService.sendMessage('Hello there.');
    console.log(serverConfigService.getMenuItems());
    // this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, frame => {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message', {}, message);
  }
}
