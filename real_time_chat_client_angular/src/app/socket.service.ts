import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  private userId: string;

  constructor() {
    this.socket = io('http://localhost:3000'); 
  }

  join(username: string) {
    this.userId = username;
    this.socket.emit('join', username);
  }

  sendMessage(message: string) {
    this.socket.emit('chat message', message);
  }

  getMessages(): Observable<{ userId: string; username: string; msg: string }> {
    return new Observable(observer => {
      this.socket.on('chat message', (data: { userId: string; username: string; msg: string }) => {
        observer.next(data);
      });
    });
  }

  getUsers(): Observable<{ id: string; username: string }[]> {
    return new Observable(observer => {
      this.socket.on('user list', (users: { id: string; username: string }[]) => {
        observer.next(users);
      });
    });
  }
}
