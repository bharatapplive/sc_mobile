import { Component } from '@angular/core';

import {
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  cameraOutline,
  heartOutline,
  heart,
  chatbubbleOutline,
  sendOutline,
  ellipsisHorizontal,
  musicalNoteOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-reel',
  templateUrl: './reel.page.html',
  styleUrls: ['./reel.page.scss'],
  standalone: false,

  
})
export class ReelPage {

  liked = false;

  likes = '142K';

  constructor() {

    addIcons({
      cameraOutline,
      heartOutline,
      heart,
      chatbubbleOutline,
      sendOutline,
      ellipsisHorizontal,
      musicalNoteOutline
    });

  }

  toggleLike() {

    this.liked = !this.liked;

    this.likes = this.liked ? '142.1K' : '142K';

  }
toggleVideo(video: HTMLVideoElement) {
  if (video.paused) {
    video.play().catch(err => console.log(err));
  } else {
    video.pause();
  }
}

}