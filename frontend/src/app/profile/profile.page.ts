import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

import {
  Router,
} from '@angular/router';

import {
  AuthService,
  User,
} from '../auth-service';

import {
  environment,
} from '../../environments/environment';


export interface UserProfile {

  fullname: string;

  username: string;

  postNumber: number;

  followerNumber: number | string;

  followingNumber: number;

  avatarUrl?: string;

  profileBio?: string | null;

}


@Component({

  selector: 'app-profile',

  templateUrl: './profile.page.html',

  styleUrls: ['./profile.page.scss'],

  standalone: false,

})


export class ProfilePage
  implements OnInit, OnDestroy {


  // =================================================
  // API URL
  // =================================================

  private readonly API_URL =
    environment.apiUrl;


  // =================================================
  // DEFAULT AVATAR
  // =================================================

  private readonly DEFAULT_AVATAR =
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=500&q=85';


  // =================================================
  // TEMP PREVIEW URL
  // =================================================

  private previewUrl: string | null = null;


  // =================================================
  // USER PROFILE
  // =================================================

  user: UserProfile = {

    fullname: 'Loading...',

    username: '',

    postNumber: 0,

    followerNumber: 0,

    followingNumber: 0,

    avatarUrl: '',

    profileBio: null,

  };


  activeTab: string = 'posts';

  isFollowing: boolean = false;

  isUploadingAvatar: boolean = false;


  // =================================================
  // POSTS
  // =================================================

  posts: any[] = [

    {
      image:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=85',
      likes: '1.2M',
      comments: '12K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=85',
      likes: '980K',
      comments: '8.5K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=85',
      likes: '1.5M',
      comments: '15K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=85',
      likes: '875K',
      comments: '7K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=800&q=85',
      likes: '2.1M',
      comments: '19K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=85',
      likes: '760K',
      comments: '6K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=85',
      likes: '1.8M',
      comments: '14K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=85',
      likes: '920K',
      comments: '9K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=85',
      likes: '1.1M',
      comments: '11K',
    },

    {
      image:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=85',
      likes: '2.4M',
      comments: '21K',
    },

  ];


  // =================================================
  // REELS
  // =================================================

  reels: any[] = [

    {
      image:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=85',
      views: '5.2M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=85',
      views: '8.1M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=85',
      views: '3.9M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=85',
      views: '11M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=85',
      views: '6.7M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=85',
      views: '4.4M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=85',
      views: '9.2M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=85',
      views: '7.8M',
    },

    {
      image:
        'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=600&q=85',
      views: '12M',
    },

  ];


  // =================================================
  // HIGHLIGHTS
  // =================================================

  highlights: any[] = [

    {
      title: 'India',

      image:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=300&q=85',
    },

    {
      title: 'Virat',

      image:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=300&q=85',
    },

    {
      title: 'Rohit',

      image:
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=300&q=85',
    },

    {
      title: 'IPL',

      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=85',
    },

    {
      title: 'World Cup',

      image:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=300&q=85',
    },

  ];


  // =================================================
  // TAGGED POSTS
  // =================================================

  taggedPosts: string[] = [

    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=85',

    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=85',

    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=85',

  ];


  // =================================================
  // CONSTRUCTOR
  // =================================================

  constructor(

    private readonly router: Router,

    private readonly authServe: AuthService

  ) {}


  // =================================================
  // ON INIT
  // =================================================

  ngOnInit(): void {

    console.log(
      'Profile page loaded'
    );

    this.loadProfile();

  }


  // =================================================
  // ON DESTROY
  // =================================================

  ngOnDestroy(): void {

    this.clearPreviewUrl();

  }


  // =================================================
  // LOAD PROFILE
  // =================================================

  loadProfile(): void {

    const savedUser =
      this.authServe.currentUser();


    if (savedUser) {

      console.log(
        'Current logged-in user:',
        savedUser
      );

      this.setUserProfile(
        savedUser
      );

    }


    this.authServe
      .loadUserData()
      .subscribe({

        next: (user: User) => {

          console.log(
            'Latest profile data from backend:',
            user
          );

          this.setUserProfile(
            user
          );

        },


        error: (error) => {

          console.error(
            'Unable to load profile:',
            error
          );

        },

      });

  }


  // =================================================
  // SET PROFILE DATA
  // =================================================

  private setUserProfile(
    user: User
  ): void {

    const avatar =
      this.normalizeAvatarUrl(
        user.avatarUrl
      );


    this.user = {

      fullname:
        user.fullname ||
        'User',

      username:
        user.username ||
        '',

      postNumber:
        user.postNumber ??
        0,

      followerNumber:
        user.followerNumber ??
        0,

      followingNumber:
        user.followingNumber ??
        0,

      avatarUrl:
        avatar,

      profileBio:
        user.profileBio ??
        null,

    };


    console.log(
      'Profile UI updated:',
      this.user
    );

  }


  // =================================================
  // NORMALIZE AVATAR URL
  // =================================================

  private normalizeAvatarUrl(
    avatarUrl?: string | null
  ): string {

    if (
      !avatarUrl ||
      avatarUrl.trim() === ''
    ) {

      return '';

    }


    const url =
      avatarUrl.trim();


    // Already full URL

    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('blob:')
    ) {

      return url;

    }


    // Relative URL from backend

    if (
      url.startsWith('/')
    ) {

      return `${this.API_URL}${url}`;

    }


    // Backend may return:
    // uploads/avatars/xxx.jpg

    return `${this.API_URL}/${url}`;

  }


  // =================================================
  // REFRESH
  // =================================================

  handleRefresh(
    event: any
  ): void {

    this.loadProfile();

    setTimeout(
      () => {

        if (
          event &&
          event.target
        ) {

          event.target.complete();

        }

      },

      1000
    );

  }


  // =================================================
  // GET USER AVATAR
  // =================================================

  getUserAvatar(): string {

    if (
      this.user.avatarUrl &&
      this.user.avatarUrl.trim() !== ''
    ) {

      return this.user.avatarUrl;

    }


    return this.DEFAULT_AVATAR;

  }


  // =================================================
  // AVATAR IMAGE ERROR
  // =================================================

  onAvatarError(
    event: any
  ): void {

    console.error(
      'Profile image could not be loaded:',
      this.user.avatarUrl
    );


    // Prevent infinite error loop

    if (
      event &&
      event.target
    ) {

      event.target.src =
        this.DEFAULT_AVATAR;

    }


    // Keep profile data clean

    if (
      this.user.avatarUrl !==
      this.DEFAULT_AVATAR
    ) {

      this.user.avatarUrl =
        this.DEFAULT_AVATAR;

    }

  }


  // =================================================
  // SELECT & UPLOAD AVATAR
  // =================================================

  onAvatarSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input ||
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    const file =
      input.files[0];


    console.log(
      'Selected avatar:',
      file.name,
      file.type,
      file.size
    );


    // =================================================
    // FILE TYPE VALIDATION
    // =================================================

    const allowedTypes = [

      'image/jpeg',

      'image/jpg',

      'image/png',

      'image/webp',

    ];


    if (
      !allowedTypes.includes(
        file.type.toLowerCase()
      )
    ) {

      alert(
        'Only JPG, JPEG, PNG and WEBP images are allowed.'
      );


      input.value = '';

      return;

    }


    // =================================================
    // FILE SIZE VALIDATION
    // =================================================

    const maxSize =
      5 * 1024 * 1024;


    if (
      file.size > maxSize
    ) {

      alert(
        'Image size must be less than 5 MB.'
      );


      input.value = '';

      return;

    }


    // =================================================
    // CREATE LOCAL PREVIEW
    // =================================================

    this.clearPreviewUrl();


    this.previewUrl =
      URL.createObjectURL(
        file
      );


    // Show selected image immediately

    this.user.avatarUrl =
      this.previewUrl;


    this.isUploadingAvatar =
      true;


    console.log(
      'Uploading avatar...'
    );


    // =================================================
    // UPLOAD TO BACKEND
    // =================================================

    this.authServe
      .uploadAvatar(file)
      .subscribe({

        // =================================================
        // SUCCESS
        // =================================================

        next: (
          updatedUser: User
        ) => {

          console.log(
            'Avatar upload successful:',
            updatedUser
          );


          // Get avatar returned by backend

          const serverAvatar =
            this.normalizeAvatarUrl(
              updatedUser?.avatarUrl
            );


          if (
            serverAvatar
          ) {

            // Cache busting

            const separator =
              serverAvatar.includes('?')
                ? '&'
                : '?';


            this.user.avatarUrl =
              `${serverAvatar}${separator}v=${Date.now()}`;

          } else {

            // Keep preview if backend
            // did not return avatar URL

            console.warn(
              'Backend did not return avatarUrl. Keeping local preview.'
            );

          }


          // Update other profile data

          this.user.fullname =
            updatedUser.fullname ||
            this.user.fullname;

          this.user.username =
            updatedUser.username ||
            this.user.username;

          this.user.postNumber =
            updatedUser.postNumber ??
            this.user.postNumber;

          this.user.followerNumber =
            updatedUser.followerNumber ??
            this.user.followerNumber;

          this.user.followingNumber =
            updatedUser.followingNumber ??
            this.user.followingNumber;

          this.user.profileBio =
            updatedUser.profileBio ??
            this.user.profileBio;


          this.isUploadingAvatar =
            false;


          console.log(
            'Profile picture updated successfully:',
            this.user.avatarUrl
          );


          // IMPORTANT:
          // Do NOT immediately call loadProfile()
          // here because an old cached backend response
          // can overwrite the new image.


          this.clearPreviewUrl();

        },


        // =================================================
        // ERROR
        // =================================================

        error: (
          error
        ) => {

          console.error(
            'Avatar upload failed:',
            error
          );


          this.isUploadingAvatar =
            false;


          // Remove failed preview

          this.clearPreviewUrl();


          // Reload old profile image

          this.loadProfile();


          alert(
            error?.message ||
            'Unable to upload profile picture.'
          );

        },

      });


    // =================================================
    // ALLOW SAME IMAGE TO BE SELECTED AGAIN
    // =================================================

    input.value = '';

  }


  // =================================================
  // CLEAR PREVIEW URL
  // =================================================

  private clearPreviewUrl(): void {

    if (
      this.previewUrl
    ) {

      URL.revokeObjectURL(
        this.previewUrl
      );

      this.previewUrl =
        null;

    }

  }


  // =================================================
  // EDIT PROFILE
  // =================================================

  editProfile(): void {

    console.log(
      'EDIT PROFILE BUTTON CLICKED'
    );


    this.router
      .navigate([
        '/edit-profile'
      ])
      .then(
        (success) => {

          console.log(
            'Edit profile navigation:',
            success
          );


          if (!success) {

            console.error(
              'Navigation to edit-profile failed!'
            );

          }

        }
      );

  }


  // =================================================
  // CREATE POST
  // =================================================

  createPost(): void {

    this.router.navigate([
      '/home/post'
    ]);

  }


  // =================================================
  // NOTIFICATIONS
  // =================================================

  openNotifications(): void {

    this.router.navigate([
      '/home/notifications'
    ]);

  }


  // =================================================
  // FOLLOW
  // =================================================

  followingBtn(): void {

    this.isFollowing =
      !this.isFollowing;


    console.log(
      'Following:',
      this.isFollowing
    );

  }


  // =================================================
  // LOGOUT
  // =================================================

  onLogout(): void {

    this.authServe.logout();

  }

}