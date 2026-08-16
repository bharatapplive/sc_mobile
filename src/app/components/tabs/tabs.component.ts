import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject , signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonTabBar, IonTabButton, IonIcon, IonLabel, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, search, notifications, person, add, send } from 'ionicons/icons';

type TabName = 'home' | 'trending' | 'create-story' | 'messages' | 'profile';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonTabBar, IonTabButton, RouterLinkActive, IonIcon, IonLabel, IonTabs]
})
export class TabsComponent {
  constructor() {
    addIcons({
      home,
      search,
      notifications,
      person,
      add,
      send,
    });
  }
  activeTab = signal<TabName>('home');
  // Environment injector is used for lazy loading child routes
  private injector = inject(EnvironmentInjector);

  tabs: { id: TabName; icon: string; label: string, route: string }[] = [
    { id: 'home', icon: 'home', label: 'Home', route: '/home' },
    { id: 'trending', icon: 'search', label: 'Trending', route: '/trending' },
    { id: 'create-story', icon: 'add', label: 'Create', route: '/create' },
    { id: 'messages', icon: 'send', label: 'Messages', route: '/message' },
    { id: 'profile', icon: 'person', label: 'Profile', route: '/profile' },
  ];

  selectTab(tabId: TabName): void {
    this.activeTab.set(tabId);
  }
}