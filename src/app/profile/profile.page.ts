import { Component, signal } from '@angular/core';
type profileTabs = 'posts' | 'reels' | 'tagged';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage{
  constructor() { }
  
  activeTab = signal<profileTabs>('posts')

  onTabChange(change: profileTabs) {
    this.activeTab.set(change)
  }
}
