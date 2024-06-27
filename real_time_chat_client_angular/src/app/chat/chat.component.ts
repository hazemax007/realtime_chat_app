import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { joinChat, loadUsers, receiveMessage, sendMessage } from '../_nrgx/chat.actions';
import { selectMessages, selectUsers } from '../_nrgx/chat.selectors';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages$: Observable<{ userId: string; username: string; msg: string }[]>;
  users$: Observable<{ id: string; username: string }[]>;
  message: string = '';
  username: string = '';
  isJoined: boolean = false;

  constructor(private store: Store, private socketService: SocketService) {
    this.messages$ = this.store.select(selectMessages);
    this.users$ = this.store.select(selectUsers);
  }

  ngOnInit() {
    this.socketService.getMessages().subscribe(message => {
      this.store.dispatch(receiveMessage(message));
    });

    this.socketService.getUsers().subscribe(users => {
      this.store.dispatch(loadUsers({ users }));
    });
  }

  joinChat() {
    if (this.username.trim()) {
      this.socketService.join(this.username);
      this.store.dispatch(joinChat({ username: this.username }));
      this.isJoined = true; 
    }
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.store.dispatch(sendMessage({ msg: this.message }));
      this.message = ''; 
    }
  }
}

