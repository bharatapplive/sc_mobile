import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  searchOutline,
  add,
  playOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage {

  constructor() {
    addIcons({
      homeOutline,
      searchOutline,
      add,
      playOutline,
      personOutline
    });
  }

}