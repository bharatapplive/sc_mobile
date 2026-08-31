import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage {

  activeTab: string = 'feeds';
  showTabs: boolean = true;

  constructor(private router: Router) {}

  onChangeMode(tab: string): void {

    this.activeTab = tab;

    switch (tab) {

      case 'feeds':
        this.router.navigate(['/feed']);
        break;

      case 'reels':
        this.router.navigate(['/reels']);
        break;

      case 'add':
        this.router.navigate(['/add']);
        break;

      case 'chat':
        this.router.navigate(['/chatbox']);
        break;

      case 'notifications':
        this.router.navigate(['/notifications']);
        break;

      case 'search':
        this.router.navigate(['/search']);
        break;

      case 'profile':
        this.router.navigate(['/profile']);
        break;

    }
  }

  getUserAvatar(): string {
    const avatar = localStorage.getItem('userAvatar');

    return avatar || 'assets/icon/favicon.png';
  }
}