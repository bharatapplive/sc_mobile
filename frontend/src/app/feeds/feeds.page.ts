import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { AuthService } from '../auth-service';


interface FeedItem {

  avatar: string;

  username: string;

  location: string;

  postUrl: string;

  likes: string;

  comments: string;

  shares: string;

  saved: boolean;

  liked: boolean;

  isFollowing: boolean;

  verified: boolean;

  paragraph: string;

  postTime: string;

}


interface HighLight {

  imgUrl: string;

  username: string;

}


@Component({

  selector: 'app-feeds',

  templateUrl: './feeds.page.html',

  styleUrls: ['./feeds.page.scss'],

  standalone: false

})


export class FeedsPage {


  // =====================================================
  // FILE INPUT
  // =====================================================

  @ViewChild('storyInput')
  storyInput!: ElementRef<HTMLInputElement>;


  // =====================================================
  // CURRENT USER DATA
  // =====================================================

  avatarUrl: string = '';

  username: string = '';

  _id: string = '';


  // =====================================================
  // STORY DATA
  // =====================================================

  storyPreviewUrl: string = '';

  storyFile: File | null = null;

  storyFileType: 'image' | 'video' | '' = '';

  showStoryPreview: boolean = false;


  // =====================================================
  // USER STORY
  // =====================================================

  hasMyStory: boolean = false;

  myStoryUrl: string = '';


  // =====================================================
  // FEED DATA
  // =====================================================

  feeds: FeedItem[] = [

    {

      avatar:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=150&q=80',

      username: 'virat.kohli',

      location: 'India',

      postUrl:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=85',

      likes: '1,284,563',

      comments: '12,421',

      shares: '3,245',

      saved: false,

      liked: false,

      isFollowing: false,

      verified: true,

      paragraph:
        'King Kohli 👑🔥 The name says it all! What a player and what a legacy. 🇮🇳',

      postTime: '2 HOURS AGO'

    },


    {

      avatar:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=150&q=80',

      username: 'rohit.sharma',

      location: 'Mumbai, India',

      postUrl:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=85',

      likes: '984,321',

      comments: '8,321',

      shares: '2,112',

      saved: false,

      liked: false,

      isFollowing: false,

      verified: true,

      paragraph:
        'Hitman mode activated! 💙🏏 One more special moment for Team India.',

      postTime: '4 HOURS AGO'

    },


    {

      avatar:
        'https://images.unsplash.com/photo-1560015534-cee980ba7e13?auto=format&fit=crop&w=150&q=80',

      username: 'team.india',

      location: 'India',

      postUrl:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=85',

      likes: '756,210',

      comments: '5,421',

      shares: '1,892',

      saved: false,

      liked: false,

      isFollowing: true,

      verified: true,

      paragraph:
        'One team. One dream. One billion hearts. 🇮🇳🔥',

      postTime: '6 HOURS AGO'

    },


    {

      avatar:
        'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=150&q=80',

      username: 'cricket.world',

      location: 'World Cricket',

      postUrl:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=85',

      likes: '421,563',

      comments: '3,241',

      shares: '954',

      saved: false,

      liked: false,

      isFollowing: false,

      verified: true,

      paragraph:
        'Cricket is not just a game. It is an emotion. 🏏❤️',

      postTime: '8 HOURS AGO'

    },


    {

      avatar:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=150&q=80',

      username: 'cricket.daily',

      location: 'Delhi, India',

      postUrl:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=85',

      likes: '289,432',

      comments: '2,190',

      shares: '721',

      saved: false,

      liked: false,

      isFollowing: false,

      verified: true,

      paragraph:
        'Another beautiful day for cricket! 🌟🏏',

      postTime: '10 HOURS AGO'

    },


    {

      avatar:
        'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=150&q=80',

      username: 'ipl',

      location: 'Indian Premier League',

      postUrl:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=85',

      likes: '654,231',

      comments: '7,321',

      shares: '1,542',

      saved: false,

      liked: false,

      isFollowing: false,

      verified: true,

      paragraph:
        'The stadium lights. The crowd. The pressure. IPL magic! 🔥',

      postTime: '12 HOURS AGO'

    }

  ];


  // =====================================================
  // OTHER STORIES
  // =====================================================

  highlights: HighLight[] = [

    {

      imgUrl:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=150&q=80',

      username: 'virat.kohli'

    },

    {

      imgUrl:
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=150&q=80',

      username: 'rohit.sharma'

    },

    {

      imgUrl:
        'https://images.unsplash.com/photo-1560015534-cee980ba7e13?auto=format&fit=crop&w=150&q=80',

      username: 'team.india'

    },

    {

      imgUrl:
        'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=150&q=80',

      username: 'ipl'

    },

    {

      imgUrl:
        'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=150&q=80',

      username: 'cricket.world'

    },

    {

      imgUrl:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=150&q=80',

      username: 'cricket.daily'

    }

  ];


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(

    private readonly authServe: AuthService

  ) {}


  // =====================================================
  // PAGE ENTER
  // =====================================================

  ionViewWillEnter(): void {

    this.loadCurrentUser();

  }


  // =====================================================
  // LOAD CURRENT USER
  // =====================================================

  private loadCurrentUser(): void {

    this.authServe.loadUserData().subscribe({

      next: (userData: any) => {

        console.log(
          'Feeds - Latest user:',
          userData
        );


        this.username =
          userData?.username ||
          'Cricket.Edits';


        this._id =
          userData?._id
            ? String(userData._id).trim()
            : '';


        const newAvatar =
          userData?.avatarUrl
            ? String(userData.avatarUrl).trim()
            : '';


        if (newAvatar) {

          this.avatarUrl =
            this.addCacheBuster(newAvatar);

        } else {

          this.avatarUrl = '';

        }


        console.log(
          'Feeds - Avatar:',
          this.avatarUrl
        );

      },


      error: (err) => {

        console.error(
          'Failed to load current user:',
          err
        );

        this.username =
          'Cricket.Edits';

        this.avatarUrl = '';

      }

    });

  }


  // =====================================================
  // CACHE BUSTER
  // =====================================================

  private addCacheBuster(
    url: string
  ): string {

    if (!url) {

      return '';

    }


    const separator =
      url.includes('?')
        ? '&'
        : '?';


    return `${url}${separator}v=${Date.now()}`;

  }


  // =====================================================
  // USER AVATAR
  // =====================================================

  getUserAvatar(): string {

    if (this.avatarUrl) {

      return this.avatarUrl.trim();

    }


    return 'assets/images/default-avatar.png';

  }


  // =====================================================
  // CREATE STORY
  // =====================================================

  createStory(event?: Event): void {

    // Prevent story item click
    if (event) {

      event.stopPropagation();

    }


    if (!this.storyInput) {

      console.error(
        'Story input not found.'
      );

      return;

    }


    // Open gallery
    this.storyInput.nativeElement.click();

  }


  // =====================================================
  // STORY FILE SELECTED
  // =====================================================

  onStorySelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    const file =
      input.files[0];


    console.log(
      'Selected story:',
      file
    );


    // Save file
    this.storyFile = file;


    // Detect file type
    if (file.type.startsWith('image/')) {

      this.storyFileType = 'image';

    } else if (
      file.type.startsWith('video/')
    ) {

      this.storyFileType = 'video';

    } else {

      console.error(
        'Unsupported story file.'
      );

      this.storyFile = null;

      this.storyFileType = '';

      input.value = '';

      return;

    }


    // Create preview URL
    if (this.storyPreviewUrl) {

      URL.revokeObjectURL(
        this.storyPreviewUrl
      );

    }


    this.storyPreviewUrl =
      URL.createObjectURL(file);


    // Open preview
    this.showStoryPreview = true;

  }


  // =====================================================
  // CLOSE STORY PREVIEW
  // =====================================================

  closeStoryPreview(): void {

    this.showStoryPreview = false;

  }


  // =====================================================
  // POST STORY
  // =====================================================

  postStory(): void {

    if (!this.storyFile) {

      console.error(
        'No story selected.'
      );

      return;

    }


    if (!this.storyPreviewUrl) {

      return;

    }


    // For now frontend preview
    this.myStoryUrl =
      this.storyPreviewUrl;


    this.hasMyStory = true;


    // Close modal
    this.showStoryPreview = false;


    console.log(
      'Story added successfully:',
      this.storyFile
    );


    /*
      IMPORTANT:

      Abhi story browser memory mein hai.

      Backend connect karne ke baad yahin:

      authServe.uploadStory(this.storyFile)

      call karenge.
    */

  }


  // =====================================================
  // OPEN YOUR STORY
  // =====================================================

  openYourStory(): void {

    if (!this.hasMyStory) {

      return;

    }


    this.showStoryPreview = true;

  }


  // =====================================================
  // FOLLOW
  // =====================================================

  toggleFollow(feed: FeedItem): void {

    feed.isFollowing =
      !feed.isFollowing;

  }


  // =====================================================
  // LIKE
  // =====================================================

  toggleLike(feed: FeedItem): void {

    feed.liked =
      !feed.liked;

  }


  // =====================================================
  // SAVE
  // =====================================================

  toggleSave(feed: FeedItem): void {

    feed.saved =
      !feed.saved;

  }

}