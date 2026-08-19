import { Component } from '@angular/core';

import { addIcons } from 'ionicons';

import {
  cameraOutline,
  heart,
  heartOutline,
  sendOutline,
  sparkles,
  add,
  layersOutline,
  chatbubbleOutline,
  bookmarkOutline,
  ellipsisHorizontal,
  close,
  playCircle,
  volumeMute,
  openOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {

  constructor() {
    addIcons({
      cameraOutline,
      heart,
      heartOutline,
      sendOutline,
      sparkles,
      add,
      layersOutline,
      chatbubbleOutline,
      bookmarkOutline,
      ellipsisHorizontal,
      close,
      playCircle,
      volumeMute,
      openOutline
    });
  }

}