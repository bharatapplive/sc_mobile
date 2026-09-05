import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AudioTrack, CreatePostPayload } from '../authcontroller/authInterface';
import { IonModal } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { PostService } from '../authcontroller/Post-service';
import { ProfileService } from '../authcontroller/profile-service';

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

export class FeedsPage implements OnInit, OnDestroy{
  
  @ViewChild(IonModal) modal!: IonModal;
  // Modal visibility and selected post state
  isLikesModalOpen = false;
  selectedFeedForLikes: any = null;

  isCommitModalOpen = false;
  // User content...
  avatarUrl?: string = '';
  username: string = '';
  currentUserId: string | null = null; // Declare property here

  //Music...
  isAudioId: string | null = null;
  isAudioPlay: HTMLAudioElement | null = null;
  isPlayingPreview: boolean = false;

  // List / Array / Collection....
  postList: any[] = [];
  likedByUsers: any[] = [];

  highlights: HighLight[] = [
    {imgUrl:'assets/images/Slex.jpg', username:'@ayushi.cuteii'},
    {imgUrl:'assets/images/Magal.avif', username:'@rani.kumari'},
    {imgUrl:'assets/images/barbidoll.jpg', username:'@priyanka.007'},
    {imgUrl:'assets/images/Cutipie.jpg', username:'@bhim.kumar'},
    {imgUrl:'assets/images/rock.avif', username:'@aman.rock'}
  ]

  constructor(
    private readonly postServe: PostService,
    private readonly profileServe: ProfileService
  ) { }

  ngOnInit() { 
    this.loadUserProfile();
    this.loadPost();
  }

  ngOnDestroy(){
    this.stopAudio();
  }

  loadPost(event?: any){

    this.postServe.loadAllPost().subscribe({
      next: (data: any) =>{
        // Spreads new posts at the beginning of the array
        this.postList = [...data];
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
    })
  }

  loadUserProfile(event?: any){
    
    this.profileServe.loadUserData().subscribe({
      next: (userData: any) => {
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

  previewTrack(track: AudioTrack, event: Event){
    event.stopPropagation();

    if(this.isAudioId !== track.id){
      
      // 1. If switching to a completely new track
      if(this.isAudioPlay){
        // Stop and clear the old track
        this.stopAudio();
      }

      // Instantiate the new track
      this.isAudioPlay = new Audio(track.audioUrl);
      this.isAudioId = track.id;

      this.isAudioPlay.onended = () =>{
        this.resetAudioState();
      };
    }

    // 2. Toggle Play / Pause state
    if(!this.isPlayingPreview){
      this.isAudioPlay?.play().then(()=>{
        this.isPlayingPreview = true
      }).catch((err) => {
        console.error('Audio playback failed:', err);
        this.resetAudioState();
      });
    }else{
      // Pausing keeps currentTime intact
      this.isAudioPlay?.pause();
      this.isPlayingPreview = false;
    }
  }

  stopAudio(): void {
    if (this.isAudioPlay) {
      this.isAudioPlay.pause();
      this.isAudioPlay.currentTime = 0; // Resets position to start
      this.isAudioPlay = null;
    }
    this.resetAudioState();
  }

  resetAudioState(){
    this.isPlayingPreview = false;
    this.isAudioId = null;
    this.isAudioPlay = null;
  }

  handleRefresh(event: any){
    this.loadUserProfile(event);
    this.loadPost(event);
  }

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

  openCommitModel(feed: any){
    this.isCommitModalOpen = true;
  }
  
  dismissModal() {
    this.isLikesModalOpen = false;
  }
}
