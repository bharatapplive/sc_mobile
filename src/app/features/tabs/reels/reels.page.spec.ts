import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReelsPage } from './reels.page';

describe('ReelsPage', () => {
  let component: ReelsPage;
  let fixture: ComponentFixture<ReelsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
