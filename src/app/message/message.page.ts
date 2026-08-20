import { Component } from '@angular/core';
import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  createOutline,
  searchOutline,
  homeOutline,
  addOutline,
  chatbubblesOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: false,
})
export class MessagePage {

  searchText = '';

  constructor() {
    addIcons({
      arrowBackOutline,
      createOutline,
      searchOutline,
      homeOutline,
      addOutline,
      chatbubblesOutline,
      personOutline
    });
  }

  goBack() {
    window.history.back();
  }

  newMessage() {
    console.log('New message clicked');
  }

  openChat(user: string) {
    console.log('Opening chat:', user);
  }
}