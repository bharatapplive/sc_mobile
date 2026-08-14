import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuPage } from './side-menu.page';

describe('SideMenuPage', () => {
  let component: SideMenuPage;
  let fixture: ComponentFixture<SideMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
