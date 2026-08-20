import { Component } from '@angular/core';
import { addIcons } from 'ionicons';

import {
  homeOutline,
  flameOutline,
  add,
  sendOutline
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
     'home-outline': homeOutline,
    'flame-outline': flameOutline,
    'add': add,
    'send-outline': sendOutline
    });
  }

}