import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPage } from './search.page';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters people and hashtags by the search query', () => {
    component.query = 'Riya';
    expect(component.filteredPeople.map((person) => person.username)).toEqual(['creative_soul']);

    component.query = 'travel';
    expect(component.filteredTags.map((tag) => tag.name)).toEqual(['#TravelVibes']);
  });

  it('toggles follow state for a suggested account', () => {
    const person = component.people[0];
    component.toggleFollow(person);
    expect(person.followed).toBeTrue();
    component.toggleFollow(person);
    expect(person.followed).toBeFalse();
  });
});
