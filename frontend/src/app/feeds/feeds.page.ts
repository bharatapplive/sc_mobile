import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';

export interface FeedItem {
  avatar: string;
  username: string;
  location: string;
  postUrl: string;
  likes: number;
  comments: string;
  shares: string;
  saved: string;
  paragraph: string;
  postTime: string;
  isLiked?: boolean;
  isSaved?: boolean;
  isJustLiked?: boolean;
}

export interface HighLight {
  imgUrl: string;
  username: string;
  isSeen?: boolean;
}

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
  standalone: false
})
export class FeedsPage implements OnInit {

  // =========================================================
  // USER DATA
  // =========================================================

  avatarUrl: string = '';
  username: string = '';
  _id: string = '';


  // =========================================================
  // FEED POSTS
  // =========================================================

  feeds: FeedItem[] = [

    {
      avatar: 'assets/images/rock.avif',
      username: '@aman.rock',
      location: 'Bihar',
      postUrl: 'assets/images/Post2.jpg',
      likes: 1284,
      comments: '42',
      shares: '128',
      saved: '',
      paragraph: `Exploring the boundaries of digital reality today.
This installation in Tokyo is pure magic. ✨ #DigitalArt #TokyoVibes`,
      postTime: '2HOUR AGO',
      isLiked: false,
      isSaved: false,
      isJustLiked: false
    },

    {
      avatar: 'assets/images/Magal.avif',
      username: '@ayushi.cuti',
      location: 'Dehradun',
      postUrl: 'assets/images/barbidoll.jpg',
      likes: 6520,
      comments: '742',
      shares: '28',
      saved: '',
      paragraph: `Exploring the boundaries of digital reality today.
This installation in Tokyo is pure magic. ✨ #DigitalArt #TokyoVibes`,
      postTime: '2HOUR AGO',
      isLiked: false,
      isSaved: false,
      isJustLiked: false
    },

    {
      avatar: 'assets/images/Cutipie.jpg',
      username: '@bhim.kumar',
      location: 'Roorkee',
      postUrl: 'assets/images/Post1.jpg',
      likes: 5274,
      comments: '85',
      shares: '158',
      saved: '',
      paragraph: `Exploring the boundaries of digital reality today.
This installation in Tokyo is pure magic. ✨ #DigitalArt #TokyoVibes`,
      postTime: '2HOUR AGO',
      isLiked: false,
      isSaved: false,
      isJustLiked: false
    }

  ];


  // =========================================================
  // STORIES
  // =========================================================

  highlights: HighLight[] = [

    {
      imgUrl: 'assets/images/Slex.jpg',
      username: '@ayushi.cuteii',
      isSeen: false
    },

    {
      imgUrl: 'assets/images/Magal.avif',
      username: '@rani.kumari',
      isSeen: false
    },

    {
      imgUrl: 'assets/images/barbidoll.jpg',
      username: '@priyanka.007',
      isSeen: false
    },

    {
      imgUrl: 'assets/images/Cutipie.jpg',
      username: '@bhim.kumar',
      isSeen: false
    },

    {
      imgUrl: 'assets/images/rock.avif',
      username: '@aman.rock',
      isSeen: false
    }

  ];


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private readonly authServe: AuthService
  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.authServe.loadUserData().subscribe({

      next: (userData) => {

        this.username = userData.username || '';

        this.avatarUrl =
          userData.avatarUrl?.trim() || '';

        this._id =
          userData?._id
            ? String(userData._id).trim()
            : '';

        console.log('User ID:', this._id);

      },

      error: (err) => {

        console.error(
          'Failed to load user profile:',
          err
        );

      }

    });

  }


  // =========================================================
  // USER AVATAR
  // =========================================================

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


  // =========================================================
  // STORY OPEN
  // =========================================================

  openStory(story: HighLight): void {

    /*
     * Story ko viewed mark karna
     */

    story.isSeen = true;

    console.log(
      'Story opened:',
      story.username
    );

  }


  // =========================================================
  // LIKE
  // =========================================================

  toggleLike(feed: FeedItem): void {

    feed.isLiked = !feed.isLiked;

    if (feed.isLiked) {

      feed.isJustLiked = true;

      setTimeout(() => {

        feed.isJustLiked = false;

      }, 800);

    }

  }


  // =========================================================
  // SAVE / BOOKMARK
  // =========================================================

  toggleSave(feed: FeedItem): void {

    feed.isSaved = !feed.isSaved;

  }


  // =========================================================
  // COMMENTS
  // =========================================================

  openComments(feed: FeedItem): void {

    console.log(
      'Open comments for:',
      feed.username
    );

  }

}