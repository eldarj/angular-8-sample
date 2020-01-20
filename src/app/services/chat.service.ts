import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public sendMessage(message: string) {
    // const pushSocket = new WebSocket('ws://localhost:8080/push/');
    //
    // pushSocket.onmessage = (event) => {
    //   console.log(event.data);
    //   // do ui update here
    // };
    //
    // pushSocket.onopen = (event) => {
    //   // send empty message to initialize socket connnection
    //   pushSocket.send('');
    // };
    //
    // pushSocket.onclose = (event) => {
    //   // send empty message to initialize socket connnection
    //   alert('Socket Closed by Server');
    // };
  }
}
