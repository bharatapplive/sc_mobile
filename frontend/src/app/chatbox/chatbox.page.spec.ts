import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatboxPage } from './chatbox.page';

describe('ChatboxPage', () => {
  let component: ChatboxPage;
  let fixture: ComponentFixture<ChatboxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
