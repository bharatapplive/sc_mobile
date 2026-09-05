import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, Subscription } from 'rxjs';
import { ProfileService } from '../authcontroller/profile-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  avatarUrl?: string = '';

  activeTab: string = '/feeds';
  showTabs = true;
  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private readonly profileServe: ProfileService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.profileServe.loadUserData().subscribe({
      next: (userData) => {
        this.avatarUrl = userData?.avatarUrl?.trim();   
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });

    // Clean subscription tracking
    this.routerSub = this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const currentRoute = event.urlAfterRedirects || event.url;
      
      // Split by single slash and filter out empty strings (e.g., "/home/feeds" -> ["home", "feeds"])
      const segments = currentRoute.split('/').filter(segment => segment.length > 0);
      const activeSegment = segments[segments.length - 1];

      if (activeSegment) {
        this.activeTab = activeSegment;
      }

      const hiddenRoutes = ['login', 'post'];

      const ishide = hiddenRoutes.some(route => currentRoute.includes(route));
      // Hide tabs on login page
      this.showTabs = !ishide;
    });
  }

  onChangeMode(tabName: string){
    this.activeTab = tabName;
    this.navCtrl.navigateRoot(['home', tabName], { animated: false });
  }

  ionViewWillLeave() {
    // Remove focus from active element before page transition
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
