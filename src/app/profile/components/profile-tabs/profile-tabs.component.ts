import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type ProfileTab = 'posts' | 'reels' | 'tagged';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class ProfileTabsComponent {
  @Input() activeTab: ProfileTab = 'posts';
  @Output() tabChange = new EventEmitter<ProfileTab>();

  tabs: { id: ProfileTab; icon: string; route: string }[] = [
    { id: 'posts', icon: 'grid_on', route: 'posts' },
    { id: 'reels', icon: 'video_library' , route: 'reels' },
    { id: 'tagged', icon: 'assignment_ind', route: 'tagged' }
  ];

  selectTab(tab: ProfileTab) {
    this.activeTab = tab;
    this.tabChange.emit(tab);
  }
}
