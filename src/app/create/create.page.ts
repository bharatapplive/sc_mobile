import { Component } from '@angular/core';

import { addIcons } from 'ionicons';

import {
  closeOutline,
  settingsOutline,
  radioOutline,
  cameraReverseOutline,
  colorFilterOutline,
  musicalNotesOutline,
  timerOutline,
  speedometerOutline,
  flashOffOutline,
  homeOutline,
  searchOutline,
  addCircle,
  notificationsOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: false,
})
export class CreatePage {

  constructor() {

    addIcons({
      closeOutline,
      settingsOutline,
      radioOutline,
      cameraReverseOutline,
      colorFilterOutline,
      musicalNotesOutline,
      timerOutline,
      speedometerOutline,
      flashOffOutline,
      homeOutline,
      searchOutline,
      addCircle,
      notificationsOutline,
      personOutline
    });

  }

}