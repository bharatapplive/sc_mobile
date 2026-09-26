import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/home/features/profile/profile-service';
import { ChatService } from 'src/app/home/features/chatbox/chat-service';
import { Followers, User } from 'src/app/core/authcontroller/authInterface';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/authcontroller/auth-service';

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
  
  user: User | null = null;
  avatarUrl?: string = '';
  selectedTag: string = 'Primary';
  isSeen: boolean = false;

  tags: string[] = ['Primary', 'Requests', 'General'];

  follows: User[] = []
  followerList: any[] = [];
  followingList: any[] =[];

  onlineFriend = [
    {_id:'1', fullname:'Luna Art', imgUrl:'assets/images/luna_art.jpg', status:'false'},
    {_id:'1', fullname:'Neo Pixel', imgUrl:'assets/images/neo_pixel.jpg', status:'false'},
    {_id:'1', fullname:'Travel Joy', imgUrl:'assets/images/travel_joy.jpg', status:'false'},
  ]
  
  constructor(
    private readonly authServe: AuthService,
    private readonly profileServe: ProfileService,
    private readonly chatServe: ChatService
  ) { }

  ngOnInit() { 
    this.profileServe.loadUserData().subscribe({
      next: (userData) => {
        this.user = userData;
        this.avatarUrl = userData.avatarUrl?.trim();       
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });

    this.updateFollowList();

    this.isSeen = false;
  }

  //#region Following/Follower Content....
  onClickFollow(item: any){
    const otherUserID = item?._id;

    const payLoad: Followers = {
      followerId: this.user?._id??'',
      followingId: otherUserID
    }

    this.profileServe.createNewFollower(payLoad).subscribe({
      next:()=>{
        this.updateFollowList();
      },
      error(er){
        console.log(er);
      }
    })
  }

  updateFollowList(event?: any){
    this.profileServe.callAllFollowers().subscribe({
      next: ((response)=>{
        const list = Array.isArray(response) ? response : [];

        // Step-1. Get the list of user whom i followed
        const following = list.filter(item => item.followerId === this.user?._id);

        // Step-2. Get the list of user the follow my account..
        const follower = list.filter(item => item.followingId === this.user?._id);

        this.authServe.allUsers().subscribe({
          next:(data: User[])=>{
            const list = data;

            // Step-3. Fetch the user whom i followed..
            const request1 = new Set(following.map(item => item.followingId));
            this.followingList = list.filter(item => request1.has(item._id));

            // Step-4. Fetch the user that following my account..
            const request2 = new Set(follower.map(item => item.followerId));
            this.followerList = list.filter(item => request2.has(item._id));
        
            // Step-5. Filter only those user who didn't in my following list..
            this.follows = list.filter(item=>item._id !== this.user?._id && !request1.has(item._id));
          }
        });

        if (event) {
          event.target.complete();
        }
      }),
      error(er){
        console.log(er);
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  isFollower(item: any): boolean{
    const id = item._id;
    return this.followerList.some((follow) => follow._id === id
    );
  }
  //#endregion

  selectTag(tag: string) {
    this.selectedTag = tag;
  }
}
