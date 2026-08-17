import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter, Subscription } from 'rxjs';

interface UserProfile {
  avatarUrl?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  user: UserProfile | null = null;
  
  private readonly API_URL = 'http://localhost:3000';

  activeTab: string = '/feeds';
  showTabs = true;
  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const rawId = localStorage.getItem('userID');
    const userId = rawId ? JSON.parse(rawId) : null;

    this.http.get<UserProfile>(`${this.API_URL}/user/${userId}`).subscribe(
      {
        next: (userData) => {
          this.user = userData;
          
        },
        error: (err) => {
          console.error('Failed to load user profile:', err);
        },
      }
    );

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

        // Hide tabs on login page
        this.showTabs = !currentRoute.includes('login');
      });
  }

  onChangeMode(tabName: string){
    this.activeTab = tabName;
    this.navCtrl.navigateRoot(['home', tabName], { animated: false });
  }

  // 1. GET AVATAR...
  getUserAvatar(): string{
    // const avatar = this.user?.avatarUrl?.trim();

    // if (avatar) {
    //   // Return absolute URLs directly
    //   if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
    //     return avatar;
    //   }
      
    //   // Ensure slash separator between API_URL and avatar path
    //   const formattedPath = avatar.startsWith('/') ? avatar : `/${avatar}`;
    //   return `${this.API_URL}${formattedPath}`;
    // }

    // Default fallback placeholder
    return 'assets/images/default-avatar.png';
  }
}
