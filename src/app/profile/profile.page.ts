import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { AuthService } from '../authcontroller/auth-service';

export interface UserProfile{
  fullname: string;
  username: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})

export class ProfilePage implements OnInit {

  //#region User Details...
  user: UserProfile | null = null;

  postNumber: number = 0;
  followerNum: number = 0;
  followingNum: number = 0;
  //#endregion

  isFollowing: boolean = false;

  isGrid = true;
  isDraft = false;
  isReply = false;

  activeTab: string = 'posts';

  posts: any[] = [];

  constructor(
    private router: Router,
    private readonly authServe: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.updatePost();
  }
  
  loadUserProfile(event?: any){
    this.authServe.loadUserData().subscribe({
      next: (userData: any) => {
        this.user = userData;
                
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
    if (this.user?.avatarUrl) {
      // Return absolute URLs directly
      if (this.user?.avatarUrl.startsWith('http://') || this.user?.avatarUrl.startsWith('https://')) {
        return this.user?.avatarUrl.trim();
      }
    }
    // Default fallback placeholder
    return 'assets/images/default-avatar.png';
  }

  // 2. UPDATE POST..
  updatePost(){
    this.authServe.loadPostData().subscribe({
      next: (userData: any) => {
        // If backend returns an array (from find({ userId }))
        if (Array.isArray(userData)) {
          this.posts = userData;
        } 
        // If backend returns a single object (from findById)
        else if (userData) {
          this.posts = [userData];
        } else {
          this.posts = [];
        }
        
        this.postNumber = this.posts.length;
        
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      }
    })
  }

  // 3. UPDATE FOLLOWER..
  updateFollower(){
    
   
  }

  // 4. UPDATE FOLLOWING..
  updateFollowing(){
    
    
  }

  // 5. FOLLOWING PEOPLES
  followingBtn(){
    this.isFollowing = !this.isFollowing;
    console.log(this.isFollowing);
    this.updateFollowingList();
  }

  updateFollowingList()
  {
    // if(this.isFollowing){
    //   this.following = (Number(this.following) || 0) + 1;
    //   this.updateFollowing();
    // }
    // else
    // {      
    //   this.following = (Number(this.following) || 0) - 1;
    //   this.updateFollowing();
    // }
  }

  editProfile(){

  } 

  openPostPanel(){
    this.router.navigate(['./post']);
  }
  onLogout(){
    this.authServe.logout();
  }
}
