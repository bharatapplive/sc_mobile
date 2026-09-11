import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  NavigationEnd,
  Router
} from '@angular/router';

import {
  NavController
} from '@ionic/angular';

import {
  filter,
  Subscription
} from 'rxjs';

import {
  AuthService,
  User
} from '../auth-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit, OnDestroy {

  // ==================================================
  // USER DATA
  // ==================================================

  avatarUrl: string = '';

  username: string = '';


  // ==================================================
  // NAVIGATION
  // ==================================================

  activeTab: string = 'feeds';

  showTabs: boolean = true;

  // Top mobile header sirf Feed/Home par show hoga
  showHomeHeader: boolean = true;

  private routerSub!: Subscription;


  // ==================================================
  // CONSTRUCTOR
  // ==================================================

  constructor(
    private readonly router: Router,
    private readonly authServe: AuthService,
    private readonly navCtrl: NavController
  ) {}


  // ==================================================
  // ON INIT
  // ==================================================

  ngOnInit(): void {

    console.log(
      'Home page loaded'
    );

    // Load current user
    this.loadCurrentUser();


    // ==================================================
    // TRACK ROUTE
    // ==================================================

    this.routerSub =
      this.router.events
        .pipe(
          filter(
            (
              event
            ): event is NavigationEnd =>
              event instanceof NavigationEnd
          )
        )
        .subscribe(
          (
            event: NavigationEnd
          ) => {

            const currentRoute =
              event.urlAfterRedirects ||
              event.url;


            // ==================================================
            // ACTIVE TAB
            // ==================================================

            const segments =
              currentRoute
                .split('/')
                .filter(
                  segment =>
                    segment.length > 0
                );


            const activeSegment =
              segments[
                segments.length - 1
              ];


            if (
              activeSegment &&
              [
                'feeds',
                'reels',
                'chat',
                'search',
                'profile'
              ].includes(
                activeSegment
              )
            ) {

              this.activeTab =
                activeSegment;

            }


            // ==================================================
            // MOBILE TOP HEADER
            // ==================================================

            this.showHomeHeader =
              currentRoute.endsWith(
                '/home'
              ) ||
              currentRoute.endsWith(
                '/home/feeds'
              );


            // ==================================================
            // MOBILE BOTTOM NAVIGATION
            // ==================================================

            this.showTabs =
              !currentRoute.includes(
                'login'
              );


            // ==================================================
            // IMPORTANT
            // ==================================================
            // Route change par latest user data load karo.
            // Isse profile image / username fresh rahega.

            if (
              activeSegment ===
                'profile' ||
              activeSegment ===
                'feeds'
            ) {

              this.loadCurrentUser();

            }

          }
        );

  }


  // ==================================================
  // LOAD CURRENT USER
  // ==================================================

  private loadCurrentUser(): void {

    const localUser =
      this.authServe.currentUser();


    // ==================================================
    // FIRST USE LOCAL SIGNAL DATA
    // ==================================================

    if (localUser) {

      console.log(
        'Home - Current user:',
        localUser
      );


      this.username =
        localUser.username ||
        'Cricket.Edits';


      this.avatarUrl =
        localUser.avatarUrl ||
        '';

    }


    // ==================================================
    // THEN GET LATEST DATA FROM BACKEND
    // ==================================================

    this.authServe
      .loadUserData()
      .subscribe({

        next: (
          userData: User
        ) => {

          console.log(
            'Home - Latest user data:',
            userData
          );


          this.username =
            userData?.username ||
            'Cricket.Edits';


          this.avatarUrl =
            userData?.avatarUrl ||
            '';


          console.log(
            'Home - Avatar URL:',
            this.avatarUrl
          );

        },


        error: (
          error
        ) => {

          console.error(
            'Home - Failed to load user:',
            error
          );


          // Agar local user available hai
          // to usko use karte raho.

          const user =
            this.authServe.currentUser();


          if (user) {

            this.username =
              user.username ||
              'Cricket.Edits';


            this.avatarUrl =
              user.avatarUrl ||
              '';

          }

        }

      });

  }


  // ==================================================
  // BOTTOM / SIDE NAVIGATION
  // ==================================================

  onChangeMode(
    tabName: string
  ): void {

    this.activeTab =
      tabName;


    this.navCtrl.navigateRoot(
      [
        'home',
        tabName
      ],
      {
        animated: false
      }
    );

  }


  // ==================================================
  // CREATE POST
  // ==================================================

  createPost(): void {

    this.navCtrl.navigateForward(
      [
        'home',
        'post'
      ]
    );

  }


  // ==================================================
  // NOTIFICATIONS
  // ==================================================

  showNotifications(): void {

    console.log(
      'Notifications opened'
    );

  }


  // ==================================================
  // USER AVATAR
  // ==================================================

  getUserAvatar(): string {

    /*
     * IMPORTANT:
     *
     * Sabse pehle AuthService ke
     * currentUser signal se avatar lo.
     *
     * Isse profile image upload hone ke baad
     * Home sidebar bhi updated image
     * use karega.
     */

    const currentUser =
      this.authServe.currentUser();


    const currentAvatar =
      currentUser?.avatarUrl ||
      this.avatarUrl ||
      '';


    if (
      currentAvatar &&
      currentAvatar.trim()
    ) {

      const cleanUrl =
        currentAvatar.trim();


      // ==================================================
      // FULL HTTP URL
      // ==================================================

      if (
        cleanUrl.startsWith(
          'http://'
        ) ||
        cleanUrl.startsWith(
          'https://'
        )
      ) {

        return this.addCacheBuster(
          cleanUrl
        );

      }


      // ==================================================
      // RELATIVE BACKEND URL
      // Example:
      //
      // /uploads/avatar/abc.jpg
      //
      // becomes:
      //
      // http://localhost:3000/uploads/avatar/abc.jpg
      // ==================================================

      return this.addCacheBuster(
        this.getBackendImageUrl(
          cleanUrl
        )
      );

    }


    // ==================================================
    // DEFAULT IMAGE
    // ==================================================

    return 'assets/images/default-avatar.png';

  }


  // ==================================================
  // BACKEND IMAGE URL
  // ==================================================

  private getBackendImageUrl(
    avatarUrl: string
  ): string {

    if (!avatarUrl) {

      return '';

    }


    const cleanUrl =
      avatarUrl.trim();


    // Already full URL
    if (
      cleanUrl.startsWith(
        'http://'
      ) ||
      cleanUrl.startsWith(
        'https://'
      )
    ) {

      return cleanUrl;

    }


    // Backend URL
    return `http://localhost:3000${

      cleanUrl.startsWith('/')
        ? cleanUrl
        : '/' + cleanUrl

    }`;

  }


  // ==================================================
  // CACHE BUSTER
  // ==================================================

  private addCacheBuster(
    url: string
  ): string {

    if (!url) {

      return '';

    }


    /*
     * Browser old image cache avoid karne ke liye
     * timestamp add kar rahe hain.
     */

    const separator =
      url.includes('?')
        ? '&'
        : '?';


    return `${url}${separator}v=${Date.now()}`;

  }


  // ==================================================
  // CLEANUP
  // ==================================================

  ngOnDestroy(): void {

    if (this.routerSub) {

      this.routerSub.unsubscribe();

    }

  }

}