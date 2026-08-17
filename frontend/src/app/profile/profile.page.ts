import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UserProfile {
  _id: string;
  fullname: string;
  username: string;
  avatarUrl?: string;
  postNumber: number;
  followerNumber: number;
  followingNumber: number;
  profileBio: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})

export class ProfilePage implements OnInit {

  
  @Input() userId: string ='';
  post: number = 0;
  follower: number = 0;
  following: number = 0;

  isFollowing: boolean = false;
  isGrid = true;
  isDraft = false;
  isReply = false;

  user: UserProfile | null = null;

  activeTab: string = 'posts';

  private readonly API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }
  
  loadUserProfile(event?: any){
    
    const rawId = localStorage.getItem('userID');
    const userId = rawId ? JSON.parse(rawId) : null;

    this.http.get<UserProfile>(`${this.API_URL}/user/${userId}`).subscribe(
      {
        next: (userData) => {
          this.user = userData;
          this.userId = userData._id;
          this.post = userData.postNumber;
          this.follower = userData.followerNumber;
          this.following = userData.followingNumber;

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
      }
    );
  }
  
  handleRefresh(event: any){
    this.loadUserProfile(event);
  }

  // 1. GET AVATAR...
  getUserAvatar(): string{
    // if(this.user?.avatarUrl)
    // {
    //   return `${this.API_URL}${this.user.avatarUrl}`;
    // }
    // // Default placeholder fallback
    return 'assets/images/default-avatar.png';
  }

  // 2. UPDATE POST..
  updatePost(){    
    this.post++;
    const payload = {userId: this.userId, postNumber: Number(this.post)};

    this.http.patch<{postNumber: number}>(`${this.API_URL}/user/post`,payload).subscribe(
      {
        next:(response) => {
          console.log('Successfully updated on server:', response);
        },
        error: (err) => console.error('Upload failed:', err)
      }
    )
  }

  // 3. UPDATE FOLLOWER..
  updateFollower(){
    
    // Fallback to 0 if database returns null/undefined, then increment
    this.follower = (Number(this.follower) || 0) + 1;

    const payload = {userId: this.userId, followerNumber: this.follower};

    this.http.patch<{followerNumber: number}>(`${this.API_URL}/user/follower`, payload).subscribe(
      {
        next:(response) => {
          console.log('Successfully updated on server:', response);
        },
        error: (err) => console.error('Upload failed:', err)
      }
    )
  }

  // 4. UPDATE FOLLOWING..
  updateFollowing(){
    
    // Fallback to 0 if database returns null/undefined, then increment
    //this.following = (Number(this.following) || 0) + 1;

    const payload = {userId: this.userId, followingNumber: this.following};

    this.http.patch<{followingNumber: number}>(`${this.API_URL}/user/following`, payload).subscribe(
      {
        next:(response) => {
          console.log('Successfully updated on server:', response);
        },
        error: (err) => console.error('Upload failed:', err)
      }
    )
  }

  // 5. FOLLOWING PEOPLES
  followingBtn(){
    this.isFollowing = !this.isFollowing;
    console.log(this.isFollowing);
    this.updateFollowingList();
  }

  updateFollowingList()
  {
    if(this.isFollowing){
      this.following = (Number(this.following) || 0) + 1;
      this.updateFollowing();
    }
    else
    {      
      this.following = (Number(this.following) || 0) - 1;
      this.updateFollowing();
    }
  }

  editProfile(){

  } 

  onLogout(){
    this.router.navigate(['/login']);
  }
}
