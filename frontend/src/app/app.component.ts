import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {    
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

    switch(tabName){
      case 'feeds':
        this.router.navigate(['/feeds']);
        break;
      case 'reels':
        this.router.navigate(['/reels']);
        break;
      case 'chat':
        this.router.navigate(['/chat']);
        break;
      case 'search':
        this.router.navigate(['/search']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
    }
  }

  // 1. GET AVATAR...
  getUserAvatar(): string{
    if(this.user?.avatarUrl)
    {
      return `${this.API_URL}${this.user.avatarUrl}`;
    }
    // Default placeholder fallback
    return 'assets/images/default-avatar.png';
  }
}
