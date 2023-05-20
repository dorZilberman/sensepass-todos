import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from "socket.io-client";
import { TodoMessage } from 'src/app/models/todoMessage/todoMessage.model';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() { 
  }

  public initSocket(): void {
    this.socket = io('http://localhost:3000');
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<TodoMessage> {
    return new Observable<TodoMessage>((observer) => {
      this.socket.on('message', (data: TodoMessage) => observer.next(data));
    });
  }
}