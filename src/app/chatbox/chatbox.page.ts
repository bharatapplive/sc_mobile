import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../authcontroller/profile-service';
import { ChatService } from '../authcontroller/chat-service';

interface FollowList{
  _id: string;
  username: string;
  fullname: string;
  imgUrl: string;
  status: string;
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.page.html',
  styleUrls: ['./chatbox.page.scss'],
  standalone: false
})

export class ChatboxPage implements OnInit {
  
  avatarUrl?: string = '';
  selectedTag: string = 'Primary';
  isSeen: boolean = false;

  tags: string[] = ['Primary', 'Requests', 'General'];

  follows: FollowList[] = [
    {_id:'1', username:'@amam.rock', fullname:'Aman Sharma', imgUrl:'assets/images/rock.avif', status:'follow'},
    {_id:'2', username:'@ayushi.cuteii', fullname:'Ayushi Singh', imgUrl:'assets/images/barbidoll.jpg', status:'follow'},
    {_id:'2', username:'@rishu.raj', fullname:'Rishav Raj', imgUrl:'assets/images/Cutipie.jpg', status:'follow back'},
    {_id:'2', username:'@bhim.kumar', fullname:'Bhim Kumar', imgUrl:'assets/images/Magal.avif', status:'follow back'}
  ]

  onlineFriend = [
    {_id:'1', fullname:'Luna Art', imgUrl:'assets/images/luna_art.jpg', status:'false'},
    {_id:'1', fullname:'Neo Pixel', imgUrl:'assets/images/neo_pixel.jpg', status:'false'},
    {_id:'1', fullname:'Travel Joy', imgUrl:'assets/images/travel_joy.jpg', status:'false'},
  ]
  
  constructor(
    private readonly profileServe: ProfileService,
    private readonly chatServe: ChatService
  ) { }

  ngOnInit() { 
    this.profileServe.loadUserData().subscribe({
      next: (userData) => {
        this.avatarUrl = userData.avatarUrl?.trim();       
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });

    this.isSeen = false;
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

  selectTag(tag: string) {
    this.selectedTag = tag;
  }
}
