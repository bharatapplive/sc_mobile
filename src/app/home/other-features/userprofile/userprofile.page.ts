import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ProfileService } from '../../features/profile/profile-service';
import { AuthService } from 'src/app/core/authcontroller/auth-service';
import { PreviousRouteServe } from 'src/app/core/previous-route-serve';
import { DirectMessage, DMAuthor, User } from 'src/app/core/authcontroller/authInterface';
import { slideRightToLeftAnimation } from 'src/app/animation/rightToleft.animation';
import { PostService } from '../post/Post-service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
  standalone: false
})
export class UserprofilePage implements OnInit {
  
  user: User| null = null
  roomId = '';
  activeUser: DirectMessage | null = null;

  postNumber: number = 0;
  followerNum: number = 0;
  followingNum: number = 0;

  private prevUrl: string | null = null;  

  
  activeTab: string = 'posts';

  isEditProfile: boolean = false;
  isFollowerModel: boolean = false;
  isFollowingModel: boolean = false;
  isPostModalOpen = false;
  isTaken: boolean | null = null;

  posts: any[] = [];
  followerList: any[] = [];
  followingList: any[] =[];
  showPost: any[] = [];
  checkUser: any[] = [];
  private followList: any[] = [];

  constructor(
    private readonly navCtrl: NavController,
    private readonly profileServe: ProfileService,
    private readonly postServe: PostService,
    private readonly authServe: AuthService,
    private readonly previousRoute: PreviousRouteServe,
    private readonly toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    const session = this.authServe.getSession();
    if(!session.isAuthenticated)
    { 
      return;
    }
    
    // 1. Unpack navigation state
    const state = history.state;
    console.log(state);
    if (state ) {
      this.roomId = state.roomId;
      this.activeUser = state.targetUser;
      const user_Id = state.userId
      console.log(this.activeUser);
      //this.loadUser(user_Id);
    }
    
    
    this.prevUrl = this.previousRoute.getPreviousUrl() || '/home/directmessage';
  }

  loadUser(id: any){
    this.profileServe.loadUserDataById(id).subscribe({
      next: (userdata)=> {
        this.user = userdata;
      },
      error(err) {
        console.log(err);
      },
    })
  }

  // 2. UPDATE POST..
  updatePost(event?: any){
    
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
        if (event) {
          event.target.complete();
        }
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
        if (event) {
          event.target.complete();
        }
      }
    });
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

  //#region following...  
  updateFollowList(event?: any){
    this.profileServe.callAllFollowers().subscribe({
      next: ((response)=>{
        this.followList = Array.isArray(response) ? response : [];

        // Step-1. Get the list of user whom i followed
        const following = this.followList.filter(item => item.followerId === this.user?._id);

        // Step-2. Get the list of user the follow my account..
        const follower = this.followList.filter(item => item.followingId === this.user?._id);

        // Step-3. Set the count by lenghts...
        this.followerNum = follower.length;
        this.followingNum = following.length;

        this.authServe.allUsers().subscribe({
          next:(data: User[])=>{
            const list = data;

            // Step-4. Fetch the user whom i followed..
            const request1 = new Set(following.map(item => item.followingId));
            this.followingList = list.filter(item => request1.has(item._id));

            // Step-5. Fetch the user that following my account..
            const request2 = new Set(follower.map(item => item.followerId));
            this.followerList = list.filter(item => request2.has(item._id));
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

  isFollowing(id: string):boolean{
    const hasFollowBack = this.followingList.some(item => item._id === id);
    return hasFollowBack;
  }

  onClickRemove(item: any){
    this.profileServe.removeFollower(item._id).subscribe({
      next: ()=>{
        this.isFollowerModel = false;
        this.updateFollowList();
      },
      error(err) {
        console.log(err);
      },
    })
  }
  //#endregion
 
  goBack(){
    if(this.prevUrl){
      this.navCtrl.navigateBack(this.prevUrl, {
        animation: slideRightToLeftAnimation,
        state:{
          
        }
      });
    }
    this.user = null;
    this.activeUser =null;
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
