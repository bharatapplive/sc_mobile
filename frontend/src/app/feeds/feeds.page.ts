import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
  standalone:false
})

export class FeedsPage implements OnInit {

  avatarUrl?: string = '';

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
}
