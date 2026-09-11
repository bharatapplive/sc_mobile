import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authcontroller/auth-service';
import { ProfileService } from 'src/app/core/authcontroller/profile-service';
import { PostService } from 'src/app/home/features/post/Post-service';
import { ToastController } from '@ionic/angular';

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
  currentUserId: string = '';
  isPostModalOpen = false;

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
  showPost: any[] = [];

  constructor(
    private router: Router,
    private readonly authServe: AuthService,
    private readonly postServe: PostService,
    private readonly profileServe: ProfileService,
    private readonly toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.updatePost();
  }
  
  // 1. USER DATA.....
  loadUserProfile(event?: any){
    this.profileServe.loadUserData().subscribe({
      next: (userData: any) => {
        this.user = userData;
        this.currentUserId = userData?._id;
      
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

  // 2. UPDATE POST..
  updatePost(){
    
    this.postServe.loadPostData().subscribe({
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

  // 3. DELETE POST..
  deletePost(item: any){
    const item_Id = item._id;
    console.log(item_Id);

    this.postServe.deletePostfromUser(item_Id).subscribe({
      next:()=>{
        this.presentSuccessToast('Post deleted succesfully');
        this.updatePost();
      },
      error: (err) => {
        console.error('Failed to load Post:', err);
      
      },
    })
   
  }

  // 4. OPEN thePOST..
  OpenThePostModel(item: any){
    this.isPostModalOpen = true;
    if (Array.isArray(item)) {
      this.showPost = item;
    } 
    // If backend returns a single object (from findById)
    else if (item) {
      this.showPost = [item];
    } else {
      this.showPost = [];
    }
    console.log(this.showPost);
  }

  // 5. FOLLOWING PEOPLES
  toggleLikes(item: any){  
    const userId = item._id;
    if (!userId) {return};
  
    this.postServe.updateLikes(userId).subscribe({
      next: (updatedPost: any) => {
        item.likedBy = updatedPost.likedBy;
        item.likesCount = updatedPost.likesCount;
      },
      error: (err: any) => {
        console.error('DB Update failed:', err);
      }
    });
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
    // Remove focus from any active button to prevent accessibility focus warnings
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    this.authServe.logout();
  }

  async presentSuccessToast(messageText: string) {
    const toast = await this.toastController.create({
      message: messageText,
      duration: 2500,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline', // Optional icon
    });

    await toast.present();
  }
}
