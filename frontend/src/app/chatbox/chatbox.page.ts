import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.page.html',
  styleUrls: ['./chatbox.page.scss'],
  standalone: false
})
export class ChatboxPage implements OnInit {
  
  avatarUrl?: string = '';
  selectedTag: string = 'Primary';

  tags: string[] = ['Primary', 'Requests', 'General'];

  constructor(
    private readonly authServe: AuthService
  ) { }

  ngOnInit() { 
    this.authServe.loadUserData().subscribe({
      next: (userData) => {
        this.avatarUrl = userData.avatarUrl?.trim();       
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });
  }

  getUserAvatar(): string{

      if (this.avatarUrl) {
      // Return absolute URLs directly
      if (this.avatarUrl.startsWith('http://') || this.avatarUrl.startsWith('https://')) {
        return this.avatarUrl;
      }
    }

    // Default fallback placeholder
    return 'assets/images/default-avatar.png';
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
  }
}
