import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonTabBar, IonTabButton, IonIcon, IonLabel, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, search, person, add, send } from 'ionicons/icons';

type TabName = 'home' | 'trending' | 'create' | 'messages' | 'profile';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonTabBar, IonTabButton, RouterLinkActive, IonIcon, IonLabel, IonTabs]
})
export class TabsComponent {
  constructor() {
    addIcons({ home, search, person, add, send });
  }

  activeTab = signal<TabName>('home');

  tabs: { id: TabName; icon: string; label: string; route: string }[] = [
    { id: 'home', icon: 'home', label: 'Home', route: '/tabs/home' },
    { id: 'trending', icon: 'search', label: 'Trending', route: '/tabs/trending' },
    { id: 'create', icon: 'add', label: 'Create', route: '/tabs/create' },
    { id: 'messages', icon: 'send', label: 'Messages', route: '/tabs/messages' },
    { id: 'profile', icon: 'person', label: 'Profile', route: '/tabs/profile' },
  ];

}
