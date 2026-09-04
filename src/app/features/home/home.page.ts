import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  activeTab: string = 'feeds';
  showTabs: boolean = true;

  ngOnInit() {
    this.updateActiveTab(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveTab(event.urlAfterRedirects || event.url);
      });
  }

  private updateActiveTab(url: string) {
    if (url.includes('/home/chat')) {
      this.activeTab = 'chat';
    } else if (url.includes('/home/reels')) {
      this.activeTab = 'reels';
    } else if (url.includes('/home/search')) {
      this.activeTab = 'search';
    } else if (url.includes('/home/profile')) {
      this.activeTab = 'profile';
    } else if (url.includes('/home/feeds')) {
      this.activeTab = 'feeds';
    }
  }

  onChangeMode(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([`/home/${tab}`]);
  }

  getUserAvatar(): string {
    const user = this.authService.getCurrentUser();
    return user?.avatar || user?.avatarUrl || 'assets/images/user-profile.jpg';
  }
}

