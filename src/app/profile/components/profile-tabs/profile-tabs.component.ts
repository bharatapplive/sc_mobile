import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProfileTab = 'posts' | 'reels' | 'tagged';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileTabsComponent {
  @Input() activeTab: ProfileTab = 'posts';
  @Output() tabChange = new EventEmitter<ProfileTab>();

  tabs: { id: ProfileTab; icon: string }[] = [
    { id: 'posts', icon: 'grid_on' },
    { id: 'reels', icon: 'video_library' },
    { id: 'tagged', icon: 'assignment_ind' }
  ];

  selectTab(tab: ProfileTab) {
    this.activeTab = tab;
    this.tabChange.emit(tab);
  }
}
