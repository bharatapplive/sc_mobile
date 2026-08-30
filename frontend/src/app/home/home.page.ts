import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  avatarUrl?: string = '';

  activeTab: string = 'feeds';

  showTabs = true;

  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private readonly authServe: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {

    this.authServe.loadUserData().subscribe({
      next: (userData) => {
        this.avatarUrl = userData.avatarUrl?.trim();
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      }
    });

    this.routerSub = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {

        const currentRoute =
          event.urlAfterRedirects || event.url;

        const segments =
          currentRoute
            .split('/')
            .filter(segment => segment.length > 0);

        const activeSegment =
          segments[segments.length - 1];

        if (activeSegment) {
          this.activeTab = activeSegment;
        }

        this.showTabs =
          !currentRoute.includes('login');
      });
  }

  onChangeMode(tabName: string) {

    this.activeTab = tabName;

    this.navCtrl.navigateRoot(
      ['home', tabName],
      {
        animated: false
      }
    );
  }

  getUserAvatar(): string {

    if (this.avatarUrl) {

      if (
        this.avatarUrl.startsWith('http://') ||
        this.avatarUrl.startsWith('https://')
      ) {
        return this.avatarUrl;
      }
    }

    return 'assets/images/default-avatar.png';
  }
}