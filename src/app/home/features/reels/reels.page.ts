import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ViewWillLeave, ViewDidEnter } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { ReelService } from './reel-service';
import { CommentResponse, ReelItem } from 'src/app/core/authcontroller/authInterface';
import { ProfileService } from 'src/app/home/features/profile/profile-service';
import { AuthService } from 'src/app/core/authcontroller/auth-service';
import { EMPTY, forkJoin, switchMap, tap } from 'rxjs';
import { FeedService } from '../feeds/feed.service';

register();

@Component({
  selector: 'app-reels',
  templateUrl: './reels.page.html',
  styleUrls: ['./reels.page.scss'],
  standalone: false
})
export class ReelsPage implements OnInit, ViewWillLeave, ViewDidEnter {
  
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;

  private activeIndex: number = 0;
  isReelPlay: boolean = false;
  currentUserId: string | null = null;

  isLikesModalOpen = false;
  isCommitModalOpen = false;
  
  currentTime = 0;
  duration = 0;
  isScrubbing = false;

  commentPortal = { message: '' };
  avatarUrl?: string = '';
  
  selectedReelForLikes: any = null;
  selectedFeedId: string | null = null;
  reels: ReelItem[] = [];
  likedByUsers: any[] = [];
  commentList: any[] = [];
  
  constructor(
    private readonly reelServe: ReelService,
    private readonly profileServe: ProfileService,
    private readonly authService: AuthService,
    private readonly feedServe: FeedService
  ) {}

  ngOnInit(): void {
    const session = this.authService.getSession();
    if (!session.isAuthenticated) return;

    this.profileServe.loadUserData().subscribe({
      next: ((user: any) => {
        this.currentUserId = user._id;
        this.avatarUrl = user.avatarUrl?.trim(); 
      })
    });
  }

  ionViewDidEnter() {
    this.reelServe.loadReels().subscribe({
      next: (response: any) => {
        this.reels = [...response];
        // Ensure QueryList & DOM update before attempting playback
        requestAnimationFrame(() => {
          this.onplaySwitchScreen(this.activeIndex);
        });
      }
    });
  }

  // Intercept Ionic tab switch leaving event to force-pause media
  ionViewWillLeave() {
    this.stopAllMedia();
    this.reels = [];
  }

  // Gracefully pause all active video and audio elements
  private stopAllMedia() {
    if (this.videoPlayers) {
      this.videoPlayers.forEach(playerRef => {
        const video = playerRef.nativeElement;
        if (video && !video.paused) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }

    if (this.audioPlayers) {
      this.audioPlayers.forEach(playerRef => {
        const audio = playerRef.nativeElement;
        if (audio && !audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    }
  }

  //#region VIDEO CONTENT CONTROL
  onSlideChange(event: any) {
    const newIndex = event.detail[0]?.activeIndex ?? 0;
    this.onplaySwitchScreen(newIndex);
  }

  onVideoEnded(indexNum: number) {
    this.onplaySwitchScreen(indexNum);
  }

  onplaySwitchScreen(indexNum: number) {
    this.activeIndex = indexNum;

    // Control Videos
    if (this.videoPlayers) {
      this.videoPlayers.forEach((playerRef, index) => {
        const video = playerRef.nativeElement;
        if (!video) return;

        if (index === indexNum) {
          video.currentTime = 0;
          this.duration = video.duration || 0;
          video.play().catch(err => console.warn('Video play interrupted:', err));

          if (this.reels[index]) {
            this.reels[index].isPlaying = true;
          }
        } else {
          video.pause();
          if (this.reels[index]) {
            this.reels[index].isPlaying = false;
          }
        }
      });
    }

    // Control Audio Tracks
    if (this.audioPlayers) {
      this.audioPlayers.forEach((playerRef, index) => {
        const audio = playerRef.nativeElement;
        if (!audio) return;

        if (index === indexNum) {
          audio.currentTime = 0;
          audio.play().catch(err => console.warn('Audio play interrupted:', err));
        } else {
          audio.pause();
        }
      });
    }
  }

  formatDuration(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  onLoadedMetadata(event: Event, item: any) {
    const video = event.target as HTMLVideoElement;
    if (video && video.duration) {
      if (item.audio) {
        item.audio.duration = this.formatDuration(video.duration);
      }
    }
  }

  onDragStart() {
    this.isScrubbing = true;
  }
  
  onTimeUpdate(event: Event) {
    if (!this.isScrubbing) {
      const video = event.target as HTMLVideoElement;
      this.currentTime = video.currentTime;
    }
  }

  onSliderChange(event: any) {
    this.currentTime = event.detail.value;
  }

  onDragEnd(event: Event) {
    const video = event.target as HTMLVideoElement;
    if (video) {
      video.currentTime = this.currentTime;
    }
    this.isScrubbing = false;
  }

  togglePlayPause(index: number) {
    const video = this.videoPlayers.toArray()[index]?.nativeElement;
    const audio = this.audioPlayers.toArray()[index]?.nativeElement;
    const reel = this.reels[index];
    
    if (!video) return;

    if (video.paused) {
      video.play();
      if (audio) audio.play();
      if (reel) reel.isPlaying = true;
    } else {
      video.pause();
      if (audio) audio.pause();
      if (reel) reel.isPlaying = false;
    }
  }
  //#endregion

  //#region LIKES
  toggleLike(reel: ReelItem) {
    const userId = reel._id;
    if (!userId) return;
  
    this.reelServe.updateLikes(userId).subscribe({
      next: (updatedPost: any) => {
        reel.likedBy = updatedPost.likedBy;
        reel.likesCount = updatedPost.likesCount;
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

  openLikesModal(Reel: ReelItem) {
    this.selectedReelForLikes = Reel;
    this.isLikesModalOpen = true;

    const userIds: string[] = Reel?.likedBy || [];

    if (userIds.length === 0) {
      this.likedByUsers = [];
      return;
    }
    
    const currentUser = userIds.map((id) => this.profileServe.loadUserDataById(id));

    forkJoin(currentUser).subscribe({
      next: (userData: any[]) => {
        this.likedByUsers = userData;
      }
    });
  }
  //#endregion

  //#region COMMENTS
  openCommitModel(feed: any) {
    this.selectedFeedId = feed._id || feed.id;
    this.isCommitModalOpen = true;
    this.loadComments(feed._id);
  }

  loadComments(id: string) {
    if (!id) return;
    this.feedServe.getCommentsByFeed(id).subscribe({
      next: (response) => {
        this.commentList = Array.isArray(response) ? response : [];

        const usr = response.map((el) => this.profileServe.loadUserDataById(el.userID));

        forkJoin(usr).subscribe({
          next: (userData: any[]) => {
            this.commentList = this.commentList.map((comment, index) => ({
              ...comment,
              userID: userData[index]
            }));
          }
        });
      },
      error: (err) => {
        console.error(err.message);
      }
    });
  }
    
  onSubmitComment() {
    if (!this.currentUserId || !this.selectedFeedId || !this.commentPortal.message?.trim()) return;
    
    const payload: CommentResponse = {
      feedId: this.selectedFeedId,
      userID: this.currentUserId,
      content: this.commentPortal.message,
      likeCount: 0,
      replyCount: 0      
    };

    this.feedServe.createNewComment(payload).pipe(
      switchMap((result) => {
        this.commentPortal.message = '';
        this.isCommitModalOpen = false;
        this.loadComments(result.feedId);

        const targetItem = this.reels.find((item) => (item._id) === result.feedId);
        if (!targetItem) return EMPTY;

        return this.reelServe.commentUpdate(result.feedId).pipe(
          tap((updateResult: any) => {
            targetItem.commentsCount = updateResult.commentsCount;
          })
        );
      })
    ).subscribe();
  }

  isCommentByCurrentUser(user: any): boolean {
    if (!this.currentUserId || !user) return false;
    const commentUserId = typeof user === 'object' ? (user._id || user.id) : user;
    return this.currentUserId === commentUserId;
  }
  //#endregion
}