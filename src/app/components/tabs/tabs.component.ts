import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

import {
  homeOutline,
  searchOutline,
  
  playOutline,
  personOutline
} from 'ionicons/icons';

type TabName = 'home' | 'trending' | 'create' | 'reels' | 'profile';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonTabs
  ]
})
export class TabsComponent {

  constructor() {
    addIcons({
      homeOutline,
      searchOutline,
      add,
      playOutline,
      personOutline
    });
  }

  activeTab = signal<TabName>('home');

  tabs: {
    id: TabName;
    icon: string;
    label: string;
    route: string;
  }[] = [

    {
      id: 'home',
      icon: 'home-outline',
      label: 'Home',
      route: '/tabs/home'
    },

    {
      id: 'trending',
      icon: 'search-outline',
      label: 'Trending',
      route: '/tabs/trending'
    },

    {
      id: 'create',
      icon: 'add-square-outline',
      label: 'Create',
      route: '/tabs/create'
    },

    {
      id: 'reels',
      icon: 'play-outline',
      label: 'Reels',
      route: '/tabs/reels'
    },

    {
      id: 'profile',
      icon: 'person-outline',
      label: 'Profile',
      route: '/tabs/profile'
    }

  ];

}