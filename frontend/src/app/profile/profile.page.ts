import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})

export class ProfilePage implements OnInit {

  
  @Input() userId: string ='';
  fullname: string = '';
  username: string = '';
  postNumber: number = 0;
  follower: number = 0;
  following: number = 0;
  avatarUrl?: string = '';

  isFollowing: boolean = false;
  isGrid = true;
  isDraft = false;
  isReply = false;

  activeTab: string = 'posts';


  constructor(
    private router: Router,
    private readonly authServe: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }
  
  loadUserProfile(event?: any){
    
    this.authServe.loadUserData().subscribe({
      next: (userData) => {
        this.fullname = userData.fullname;
        this.username = userData.username;
        this.postNumber = userData.postNumber ?? 0;
        this.follower = userData.followerNumber ?? 0;
        this.following = userData.followingNumber ?? 0;

        this.avatarUrl = userData.avatarUrl?.trim();
        
        
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

  // 1. GET AVATAR...
  getUserAvatar(){
         
    if (this.avatarUrl) {
      // Return absolute URLs directly
      if (this.avatarUrl.startsWith('http://') || this.avatarUrl.startsWith('https://')) {
        return this.avatarUrl;
      }
    }
    // Default fallback placeholder
    return 'assets/images/default-avatar.png';
  }

  // 2. UPDATE POST..
  updatePost(){    
    this.postNumber++;
    // const payload = {userId: this.userId, postNumber: Number(this.postNumber)};

    // this.http.patch<{postNumber: number}>(`${this.API_URL}/user/post`,payload).subscribe(
    //   {
    //     next:(response) => {
    //       console.log('Successfully updated on server:', response);
    //     },
    //     error: (err) => console.error('Upload failed:', err)
    //   }
    // )
  }

  // 3. UPDATE FOLLOWER..
  updateFollower(){
    
    // Fallback to 0 if database returns null/undefined, then increment
    this.follower = (Number(this.follower) || 0) + 1;

    const payload = {userId: this.userId, followerNumber: this.follower};

    // this.http.patch<{followerNumber: number}>(`${this.API_URL}/user/follower`, payload).subscribe(
    //   {
    //     next:(response) => {
    //       console.log('Successfully updated on server:', response);
    //     },
    //     error: (err) => console.error('Upload failed:', err)
    //   }
    // )
  }

  // 4. UPDATE FOLLOWING..
  updateFollowing(){
    
    // Fallback to 0 if database returns null/undefined, then increment
    //this.following = (Number(this.following) || 0) + 1;

    const payload = {userId: this.userId, followingNumber: this.following};

    // this.http.patch<{followingNumber: number}>(`${this.API_URL}/user/following`, payload).subscribe(
    //   {
    //     next:(response) => {
    //       console.log('Successfully updated on server:', response);
    //     },
    //     error: (err) => console.error('Upload failed:', err)
    //   }
    // )
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
    this.authServe.logout();
  }
}
