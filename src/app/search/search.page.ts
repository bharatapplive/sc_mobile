import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage {

  searchText: string = '';

  constructor() {}

  openTrend(trend: string) {
    this.searchText = trend;
  }

}