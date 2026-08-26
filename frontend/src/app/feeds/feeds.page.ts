import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';

interface FeedItem{
  avatar: string;
  username: string;
  location: string;
  postUrl: string;
  likes: string;
  comments: string;
  shares: string;
  saved: string;
  paragraph: string;
  postTime: string;
}

interface HighLight{
  imgUrl: string;
  username: string;
}

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
  standalone:false
})

export class FeedsPage implements OnInit {

  // User content...
  avatarUrl?: string = '';
  username: string = '';
  _id:string = '';

  // List / Array / Collection....
  feeds: FeedItem[] = [
    {
      avatar:'assets/images/rock.avif',
      username: '@aman.rock',
      location: 'Bhiar',
      postUrl: 'assets/images/Post2.jpg',
      likes: '1,284',
      comments: '42',
      shares: '128',
      saved: '',
      paragraph: `Exploring the boundaries of digital reality today. 
              This installation in Tokyo is pure magic. ✨ #DigitalArt #TokyoVibes`,
      postTime: '2HOUR AGO',
    },
    {
      avatar:'assets/images/Magal.avif',
      username: '@ayushi.cuti',
      location: 'Dehradun',
      postUrl: 'assets/images/barbidoll.jpg',
      likes: '6,520',
      comments: '742',
      shares: '28',
      saved: '',
      paragraph: `Exploring the boundaries of digital reality today. 
              This installation in Tokyo is pure magic. ✨ #DigitalArt #TokyoVibes`,
      postTime: '2HOUR AGO',
    },
    {
      avatar:'assets/images/Cutipie.jpg',
      username: '@bhim.kumar',
      location: 'Roorkee',
      postUrl: 'assets/images/Post1.jpg',
      likes: '5,274',
      comments: '85',
      shares: '158',
      saved: '',
      paragraph: `Exploring the boundaries of digital reality today. 
              This installation in Tokyo is pure magic. ✨ #DigitalArt #TokyoVibes`,
      postTime: '2HOUR AGO',
    }
  ]

  highlights: HighLight[] = [
    {imgUrl:'assets/images/Slex.jpg', username:'@ayushi.cuteii'},
    {imgUrl:'assets/images/Magal.avif', username:'@rani.kumari'},
    {imgUrl:'assets/images/barbidoll.jpg', username:'@priyanka.007'},
    {imgUrl:'assets/images/Cutipie.jpg', username:'@bhim.kumar'},
    {imgUrl:'assets/images/rock.avif', username:'@aman.rock'}
  ]

  constructor(
    private readonly authServe: AuthService
  ) { }

  ngOnInit() { 
    this.loadUserProfile();
  }

  loadUserProfile(event?: any){
    this.authServe.loadUserData().subscribe({
      next: (userData: any) => {
        this.username = userData.username;
        this.avatarUrl = userData.avatarUrl?.trim(); 
        this._id = userData?._id ? String(userData._id).trim() : '';
                
        // Hide spinner if triggered by pull-to-refresh
        if (event) {
          event.target.complete();
        }        
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      
        // Hide spinner if triggered by pull-to-refresh
        if (event) {
          event.target.complete();
        }
      },
    });
  }

  handleRefresh(event: any){
    this.loadUserProfile(event);
  }

  getUserAvatar(): string{

     if (this.avatarUrl) {
      // Return absolute URLs directly
      if (this.avatarUrl.startsWith('http://') || this.avatarUrl.startsWith('https://')) {
        return this.avatarUrl;
      }
    }

    // Default fallback placeholder
    return 'assets/images/default-avatar.png';
  }
}
