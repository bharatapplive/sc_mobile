import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  activeTab: string = 'feeds';
  showTabs = true;

  constructor(private router: Router) {}

  onChangeMode(tab: string) {
    this.activeTab = tab;
    this.router.navigate([`/home/${tab}`]);
  }

  getUserAvatar(): string {
    return 'assets/images/user-profile.jpg';
  }
}
