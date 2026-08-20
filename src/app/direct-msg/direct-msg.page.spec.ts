import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectMsgPage } from './direct-msg.page';

describe('DirectMsgPage', () => {
  let component: DirectMsgPage;
  let fixture: ComponentFixture<DirectMsgPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
