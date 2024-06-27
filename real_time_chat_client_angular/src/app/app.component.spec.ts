import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockStore: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChatComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: Store, useValue: mockStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled.innerHTML); // Add this line
    expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!');
  });
   
});

