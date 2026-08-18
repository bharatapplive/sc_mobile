import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.page.html',
  styleUrls: ['./search-box.page.scss'],
  standalone:false
})
export class SearchBoxPage implements OnInit {

  selectedTag: string = '#Trending';

  tags: string[] = [
    '#Trending',
    '#Fashion',
    '#Gaming',
    '#VibeCheck',
    '#TechLife',
    '#Photography'
  ];
  constructor() { }

  ngOnInit() {
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }

}
