import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBoxPage } from './search-box.page';

describe('SearchBoxPage', () => {
  let component: SearchBoxPage;
  let fixture: ComponentFixture<SearchBoxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
