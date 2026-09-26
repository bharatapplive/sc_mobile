import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/core/authcontroller/auth-service';
import { ProfileService } from './profile-service';
import { PostService } from 'src/app/home/other-features/post/Post-service';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { ContentAuthor, Followers, User } from 'src/app/core/authcontroller/authInterface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})

export class ProfilePage implements OnInit {

  //#region User Details...
  user: User | null = null;
  selectedFile: File | null = null;
  previewPath: string | null = null;
  isSelected: boolean = false;
  
  editPortal = { edit_name: '', username:'', pronouns: '', bio: ''};
  genders = [
    { code: 'M', name: 'Male' },
    { code: 'F', name: 'Female' },
    { code: 'O', name: 'Other' }
  ];
  selectGender: string = 'M';

  currentUserId: string = '';
  isPostModalOpen = false;

  postNumber: number = 0;
  followerNum: number = 0;
  followingNum: number = 0;
  //#endregion

  isEditProfile: boolean = false;
  isFollowerModel: boolean = false;
  isFollowingModel: boolean = false;
  isTaken: boolean | null = null;

  isGrid = true;
  isDraft = false;
  isReply = false;

  activeTab: string = 'posts';

  posts: any[] = [];
  followerList: any[] = [];
  followingList: any[] =[];
  showPost: any[] = [];
  checkUser: any[] = [];
  // Keep track of original values to avoid redundant updates/checks
  private originalUserData: any = {};
  private followList: any[] = [];
  isOnline: boolean = navigator.onLine;

  constructor(
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly authServe: AuthService,
    private readonly postServe: PostService,
    private readonly profileServe: ProfileService,
    private readonly toastController: ToastController
  ) {}

  ngOnInit() {
    this.isOnline = navigator.onLine;
    console.log(this.isOnline);
  }
  
  ionViewWillEnter() {
    const session = this.authServe.getSession();
    if(!session.isAuthenticated)
    { 
      return;
    }
    else
    {
      this.loadUserProfile();
      this.updatePost();
      this.updateFollowList();

      this.originalUserData = {
        fullname: this.user?.fullname,
        username: this.user?.username,
        pronouns: this.user?.pronouns,
        bio: this.user?.bio
      };
    }
  }

  //#region MAIN PROFILE CONTENT..
  // 1. USER DATA.....
  loadUserProfile(event?: any){
    this.profileServe.loadUserData().subscribe({
      next: (response: any) => {
        this.user = response;
        this.currentUserId = response?._id;

        const payload: any = {
          avatarUrl: this.user?.avatarUrl,
          authorName: this.user?.username,
        }
        this.postServe.updatePostProfile(payload).subscribe();
        // Hide spinner if triggered by pull-to-refresh
        if (event) {
          event.target.complete();
        } 
      },error(err){
        console.error('Failed to load user profile:', err);
      
        // Hide spinner if triggered by pull-to-refresh
        if (event) {
          event.target.complete();
        }
      }
    })
    
    // Hide spinner if triggered by pull-to-refresh
    if (event) {
      event.target.complete();
    } 
  }
  
  handleRefresh(event: any){
    this.loadUserProfile(event);
    this.updatePost(event);
    this.updateFollowList(event);
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
  //#endregion

  //#region  UPLOAD PROFILE PHOTO...
  async pickPhotoFromGallery(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Avatar Source',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => this.captureImage(CameraSource.Camera),
        },
        {
          text: 'Choose from Gallery',
          icon: 'image',
          handler: () => this.captureImage(CameraSource.Photos),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async captureImage(source: CameraSource){
    try{

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: source // Opens gallery instead of camera
      });

      if(image.webPath){
        this.previewPath = image.webPath;
        if (this.user) {
          this.user.avatarUrl = this.previewPath;
        }
        const res = (await fetch(image.webPath));
        const resBlob = await res.blob();
        const resFile = new File([resBlob],'avatar.jpg', { type: resBlob.type })

        this.selectedFile = resFile;
        this.isSelected = true;

        this.authServe.uploadAnImage(this.currentUserId, this.selectedFile).subscribe(
        { next: (res: any) => 
          {        
            this.selectedFile = null;
            console.log(res);
          },
          error: (err) => {
            console.error('Upload failed:', err)
          }
        });
      }
    } catch (error) {
      // Handles permission denied, device unsupported, or runtime errors
      console.error('Failed to pick image from gallery:', error);
    }
  }

  //#endregion

  //#region EDIT PROFILE..
  editandupdateprofile(){
    if(!this.currentUserId) return;
    
    const payload: User = {
      fullname: this.user?.fullname ?? '',
      username: this.user?.username ?? '',
      pronouns: this.user?.pronouns,
      bio: this.user?.bio,
      gender: this.user?.gender      
    }

    this.profileServe.updateUserProfile(payload).subscribe({
      next:()=>{
        this.isEditProfile = false;
        this.loadUserProfile();
        this.updatePost();
      },
      error(err){
        console.error('Update failed with error:', err);

        // Handle duplicate username (HTTP 409 or 500 containing duplicate errors)
        if (err.status === 409 || err.error?.message?.includes('duplicate')) {
          console.log('Username already exists' + err);
        } else {
          console.log('Server error occurred while updating profile.');
        }
      }
    });
  }

  onSelectGender(value: string) {
    if(this.user) this.user.gender = value;
  }
  //#endregion

  //#region following...
  onClickFollow(item: any){
    const otherUserID = item?._id;

    const payLoad: Followers = {
      followerId: this.currentUserId,
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

  toggleLikes(item: any){  
    const userId = item._id;
    if (!userId) {return};
  
    this.postServe.updateLikes(userId).subscribe({
      next: (updatedPost: any) => {
        item.likesCount = updatedPost.likesCount;
      },
      error: (err: any) => {
        console.error('DB Update failed:', err);
      }
    });
  }

  goToEditProfile() {
    this.isEditProfile = !this.isEditProfile
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

  async presentActionSheet(item: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: item.followingId?.username,
      buttons: [
        {
          text: 'Unfollow',
          handler: () => { this.onClickRemove(item) }
        },
        {
          text: 'Mute',
          handler: () => { /* Handle mute */ }
        },
        {
          text: 'Report',
          role: 'destructive',
          handler: () => { /* Handle report */ }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
