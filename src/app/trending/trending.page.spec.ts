import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendingPage } from './trending.page';

describe('TrendingPage', () => {
  let component: TrendingPage;
  let fixture: ComponentFixture<TrendingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
