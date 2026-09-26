import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommentResponse, Followers, User } from 'src/app/core/authcontroller/authInterface';
import { ActionSheetController, AlertController, IonModal, ToastController } from '@ionic/angular';
import { EMPTY, forkJoin, switchMap, tap } from 'rxjs';
import { PostService } from 'src/app/home/other-features/post/Post-service';
import { ProfileService } from 'src/app/home/features/profile/profile-service';
import { ReelService } from '../reels/reel-service';
import { FeedService } from './feed.service';
import { AuthService } from 'src/app/core/authcontroller/auth-service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
  standalone:false
})

export class FeedsPage implements OnInit{
  
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;
  noop = () => {};
  user: User | null = null;
  // Boolean content
  isLikesModalOpen = false;
  isCommitModalOpen = false;
  isStoryModalOpen = false;
  isPlayingPreview: boolean = false;
  isActiveStory: boolean = false;

  selectedFeedForLikes: any = null;
  selectedFeedId: string | null = null;
  commentPortal={message:''};
  
  // User content...
  avatarUrl?: string = 'assets/icon/favicon.png';
  username: string = '';
  currentUserId: string | null = null; // Declare property here

  //Music...

  // List / Array / Collection....
  postList: any[] = [];
  likedByUsers: any[] = [];
  highlights: any[] = [];
  showHighLight: any[] = [];
  commentList: any[] = [];
  followList: any[] = [];

  constructor(
    private readonly postServe: PostService,
    private readonly reelServe: ReelService,
    private readonly profileServe: ProfileService,
    private readonly authServe: AuthService,
    private readonly feedServe: FeedService,
    private readonly toastController: ToastController,
    private readonly actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
      
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
      this.loadPost();
      this.updateFollower();

      this.postServe.loadAllStory().subscribe({
        next: ((story: any)=>{
          const storyList = [...story];
          
          this.isActiveStory = storyList.find(item => item.author?.userId === this.user?._id);
          
          this.highlights = storyList.filter(item => item.author?.userId !== this.user?._id);
        })
      });
    }
  }

  //#region LOAD THE CONTENT FIRST......
  private loadPost(event?: any){

    forkJoin({
      posts: this.postServe.loadAllPost(),
      reels: this.reelServe.loadReels()}).subscribe({
        next: ({ posts, reels }) =>{
          // Concatenate both arrays
          const combined = [...(Array.isArray(posts) ? posts : [posts]), ...(Array.isArray(reels) ? reels : [reels])];
          
          // Spreads new posts at the beginning of the array
          this.postList = combined.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

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
        }
    });
  }
  
  private loadUserProfile(event?: any){
            
    this.profileServe.loadUserData().subscribe({
      next: (userData: any) => {
        this.user = userData;
        this.username = userData.username;
        this.avatarUrl = userData.avatarUrl?.trim(); 
        this.currentUserId = userData._id;

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
    this.loadPost(event);
  }
  //#endregion

  //#region  PATCH / UPDATE LIKES AND COUNTS...
  toggleLikes(item: any){  
    const userId = item._id;
    if (!userId) {return};
  
    const update = (item.type ==='REEL' ? this.reelServe.updateLikes(userId) : this.postServe.updateLikes(userId));
    update.subscribe({
      next: (updatedPost: any) => {
        item.likedBy = updatedPost.likedBy;
        item.likesCount = updatedPost.likesCount;
      },
      error: (err: any) => {
        console.error('DB Update failed:', err);
      }
    });
  }
  
  isLikedByCurrentUser(likedBy?: string[] | null): boolean {
    if (!this.currentUserId || !likedBy) {
      return false;
    }
    return likedBy.includes(this.currentUserId);
  }

  openLikesModal(feed: any) {
    this.selectedFeedForLikes = feed;
    this.isLikesModalOpen = true;

    const userIds: string[] = feed?.likedBy || [];

    if(userIds.length === 0){
      this.likedByUsers = [];
      return;
    }
    
    const currentUser = userIds.map((id) =>{
      return this.profileServe.loadUserDataById(id);
    })

    forkJoin(currentUser).subscribe({
      next: (userData: any[]) => {
        this.likedByUsers = userData;
      }
    })
  }
  //#endregion

  //#region COMMENT PANEL AND PATCH COUNT..
  openCommitModel(feed: any){
    this.selectedFeedId = feed._id || feed.id;
    this.isCommitModalOpen = true;
    this.loadComments(feed._id);
  }

  loadComments(id: string){
    if(!id) return;
    this.feedServe.getCommentsByFeed(id).subscribe({
      next:(response)=>{
        this.commentList = Array.isArray(response) ? response : [];

        const usr = response.map((el)=>{
          return this.profileServe.loadUserDataById(el.userID)
        });

        forkJoin(usr).subscribe({
          next: (userData: any[]) => {
            this.commentList = this.commentList.map((comment, index)=>({
              ...comment,
              userID: userData[index]
            }));
          }
        });
      },
      error: (err) => {
        console.error(err.message);
      }
    })
  }
    
  onSubmitComment(){

    if(!this.currentUserId || !this.selectedFeedId || !this.commentPortal.message?.trim()) return;
    const payload: CommentResponse = {
      feedId: this.selectedFeedId,
      userID: this.currentUserId,
      content: this.commentPortal.message,
      likeCount:0,
      replyCount:0      
    }

    this.feedServe.createNewComment(payload).pipe(
      switchMap((result) => {
        // 1. Instantly reset inputs, close modal, and re-fetch comment list
        this.commentPortal.message = '';
        this.isCommitModalOpen = false;
        this.loadComments(result.feedId);

        // 2. Find the target item in postList matching feedId
        const targetItem = this.postList.find((item) => (item._id || item.id) === result.feedId);

        if (!targetItem) return EMPTY;

        // 3. Trigger single HTTP call based on item type
        const update$ = targetItem.type === 'REEL'
          ? this.reelServe.commentUpdate(result.feedId)
          : this.postServe.commentUpdate(result.feedId);

        return update$.pipe(
          tap((updateResult: any) => {
            // 4. Update commentsCount directly on postList item
            targetItem.commentsCount = updateResult.commentsCount;
          })
        );
      })
    ).subscribe();
  }

  isCommentByCurrentUser(user: any):boolean{
    if(!this.currentUserId || !user) return false;

    // Handles both string IDs and populated user objects
    const commentUserId = typeof user === 'object' ? (user._id || user.id) : user;

    return this.currentUserId === commentUserId;
  }
  //#endregion
  
  //#region STORY Panel...
  openSelfStory(id: any){
    if(!this.isActiveStory){
      return;
    }
    else{
      this.isStoryModalOpen = true;
      this.loadStory(id);
    }
  }

  openStoryPanel(id: any){
    if(!this.highlights)
    { 
      return;
    }
    else{
      this.isStoryModalOpen = true;
      this.loadStory(id);
    }
  }

  loadStory(id: any){
    this.postServe.loadAllStory().subscribe({
      next: ((storys: any) =>{
        const allStory = [...storys];
        this.showHighLight = allStory.filter(item => item.author?.userId === id);
      })
    })
  }

  async otherStoryController(){
    const ActionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Report',
        },
        {
          text: 'Mute',
        },
      ],
    });
    await ActionSheet.present();
  }
  
  //#endregion
  
  //#region Follower...

  onClickFollow(item: any){

    const otherUserID = item.author?.userId;

    const payLoad: Followers = {
      followerId: this.user?._id ?? '',
      followingId: otherUserID
    }

    this.profileServe.createNewFollower(payLoad).subscribe({
      next:()=>{
        this.updateFollower();
      },
      error(er){
        console.log(er);
      }
    })
  }

  updateFollower(){
    this.profileServe.callAllFollowers().subscribe({
      next: (result: any)=>{
        this.followList = [...result];
      },
      error(err) {
        console.log(err);
      }
    });
  }

  isFollowing(id?: string): boolean{
    if(id === this.user?._id){
      return true;
    }else{
      return this.followList.some((item) => item.followerId === this.user?._id && item.followingId === id);
    }
  }

  //#endregion

  toggleGlobalMute(): void {
    
    this.isPlayingPreview = !this.isPlayingPreview;
    this.audioPlayers.forEach((playerRef) =>{
      
      const audio = playerRef.nativeElement;
      audio.muted = this.isPlayingPreview;
    });
  }

  dismissModal() {
    this.isLikesModalOpen = false;
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
