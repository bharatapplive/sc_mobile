import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReelPage } from './reel.page';

describe('ReelPage', () => {
  let component: ReelPage;
  let fixture: ComponentFixture<ReelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
