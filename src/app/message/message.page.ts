import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonInput
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  arrowBackOutline,
  createOutline,
  searchOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonInput
  ]
})
export class MessagePage {

  searchText = '';

  constructor() {
    addIcons({
      arrowBackOutline,
      createOutline,
      searchOutline
    });
  }

  goBack() {
    window.history.back();
  }

  newMessage() {
    console.log('New message');
  }

  openChat(username: string) {
    console.log('Opening chat with:', username);

    // Later you can navigate to your chat page:
    // this.router.navigate(['/chat', username]);
  }

}