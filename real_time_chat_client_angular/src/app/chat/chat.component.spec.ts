import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { Store, StoreModule } from '@ngrx/store';
import { SocketService } from '../socket.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { selectMessages, selectUsers } from '../_nrgx/chat.selectors';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let mockStore: any;
  let mockSocketService: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockSocketService = jasmine.createSpyObj('SocketService', ['getMessages', 'getUsers', 'join', 'sendMessage']);

    mockStore.select.and.callFake((selector: any) => {
      if (selector === selectMessages) {
        return of([]);
      } else if (selector === selectUsers) {
        return of([]);
      }
      return of([]);
    });

    mockSocketService.getMessages.and.returnValue(of([]));
    mockSocketService.getUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: SocketService, useValue: mockSocketService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the username input after joining the chat', () => {
    component.username = 'testuser';
    component.joinChat();
    expect(component.isJoined).toBeTrue();
  });

  it('should enable the message input after joining the chat', () => {
    component.username = 'testuser';
    component.joinChat();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const messageInput = compiled.querySelector('input[matInput][type="text"]');
    expect(messageInput?.hasAttribute('disabled')).toBeFalse();
  });

  it('should call sendMessage on the socketService when sendMessage is called', () => {
    component.message = 'test message';
    component.sendMessage();
    expect(mockSocketService.sendMessage).toHaveBeenCalledWith('test message');
  });

  it('should clear the message input after sending a message', () => {
    component.message = 'test message';
    component.sendMessage();
    expect(component.message).toBe('');
  });

  it('should call join on the socketService when joinChat is called', () => {
    component.username = 'testuser';
    component.joinChat();
    expect(mockSocketService.join).toHaveBeenCalledWith('testuser');
  });
});

