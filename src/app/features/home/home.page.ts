import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  private router = inject(Router);

  activeTab: string = 'feeds';
  showTabs: boolean = true;

  onChangeMode(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([`/home/${tab}`]);
  }

  getUserAvatar(): string {
    return 'assets/images/user-profile.jpg';
  }
}
