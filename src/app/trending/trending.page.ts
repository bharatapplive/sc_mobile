import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  cameraOutline,
  heart,
  homeOutline,
  search,
  searchOutline,
  addCircleOutline,
  playCircleOutline,
  personOutline,
  flame,
  barChartOutline,
  trendingUpOutline,
  pricetagOutline,
  createOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
  standalone: false,

  
})
export class TrendingPage {

  searchText = '';

  constructor() {

    addIcons({
      cameraOutline,
      heart,
      homeOutline,
      search,
      searchOutline,
      addCircleOutline,
      playCircleOutline,
      personOutline,
      flame,
      barChartOutline,
      trendingUpOutline,
      pricetagOutline,
      createOutline
    });

  }

  openTrend(name: string) {
    console.log('Selected trend:', name);
  }

}