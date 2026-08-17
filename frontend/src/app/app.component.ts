import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter } from 'rxjs';

interface UserProfile {
  avatarUrl?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  user: UserProfile | null = null;
  
  private readonly API_URL = 'http://localhost:3000';

  activeTab: string = 'feeds';
  showTabs = true;
  hiddenTabRoutes: string[] = ['/login', 'register', '/upload-avatar'];
  private readonly TAB_SHOW_DELAY = 500; 
  private tabTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {    
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

    // Listen for route changes to sync active tab state on refresh and navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects || event.url;
        
        // Extract the main route segment (e.g., '/profile' -> 'profile')
        const routeSegment = currentRoute.split('/')[1];

        if (routeSegment) {
          this.activeTab = routeSegment;
        }

        // Hide tabs on login page
        this.showTabs = !currentRoute.includes('/login');
      });

    this.listenToRouterEvents(); 
  }

  listenToRouterEvents() {
    this.router.events.pipe(
      filter(
        (event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(
          (event: NavigationEnd) => {

            const currentRoute = event.urlAfterRedirects.split('?')[0];
            const isHiddenRoute = this.hiddenTabRoutes.includes(currentRoute); 

            if(this.tabTimeout){
              clearTimeout(this.tabTimeout);
            }

            if(isHiddenRoute){
              this.showTabs = false;
            }else{
              this.tabTimeout = setTimeout(()=>{
                this.showTabs = true;
              }, this.TAB_SHOW_DELAY);
            }
          }
        );
  }

  onChangeMode(tabName: string){
    this.activeTab = tabName;
    this.navCtrl.navigateRoot(`/${tabName}`, { animated: false });
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
