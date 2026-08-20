import { Component, OnInit, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { register } from 'swiper/element/bundle';

// Register Swiper Custom Elements
register();

interface ReelItem{

  id: string;
  videoUrl: string;
  username: string;
  userAvatar: string;
  description: string;
  audioTrack: string;
  likes: string;
  comments: string;
  shares: string;
  isLiked?: boolean;
  isPlaying?: boolean;
}

@Component({
  selector: 'app-reels',
  templateUrl: './reels.page.html',
  styleUrls: ['./reels.page.scss'],
  standalone:false
})
export class ReelsPage implements OnInit {

  constructor(){}
  ngOnInit(): void {
    
  }
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  // Using direct MP4 files for true Instagram-like behavior
  reels: ReelItem[] = [
    {
      id: '1',
      videoUrl: 'https://media.gettyimages.com/id/1882718862/video/determined-muscular-male-athlete-in-sportswear-doing-kettlebell-swing-exercise-at-gym.mp4?s=mp4-640x640-gi&k=20&c=XqWczzUpfxxDlgPilRv0PYhJyJQWZ2_FRXLQPFYIszo=',
      username: 'travel_coder',
      userAvatar: 'https://i.pravatar.cc/150?img=11',
      description: 'Check out this awesome view! 🚀 #ionic #angular #reels',
      audioTrack: 'Original Audio - travel_coder',
      likes: '14.2K',
      comments: '1,082',
      shares: '3.4K',
      isPlaying: true
    },
    {
      id: '2',
      videoUrl: 'https://www.pexels.com/download/video/15566120/',
      username: 'dev_tips',
      userAvatar: 'https://i.pravatar.cc/150?img=32',
      description: 'Building pure Instagram Reels in Ionic Angular! 🔥',
      audioTrack: 'Trending Audio - TechVibes',
      likes: '28.5K',
      comments: '2,410',
      shares: '12.1K',
      isPlaying: false
    }
  ];

  // Handle slide transition: play current, pause others
  onSlideChange(event: any) {
    const activeIndex = event.detail[0].activeIndex;

    this.videoPlayers.forEach((playerRef, index) => {
      const video = playerRef.nativeElement;
      if (index === activeIndex) {
        video.currentTime = 0;
        video.play();
        this.reels[index].isPlaying = true;
      } else {
        video.pause();
        this.reels[index].isPlaying = false;
      }
    });
  }

  // Tap video to toggle Play / Pause
  togglePlayPause(index: number) {
    const video = this.videoPlayers.toArray()[index]?.nativeElement;
    const reel = this.reels[index];

    if (video) {
      if (video.paused) {
        video.play();
        reel.isPlaying = true;
      } else {
        video.pause();
        reel.isPlaying = false;
      }
    }
  }

  toggleLike(reel: ReelItem) {
    reel.isLiked = !reel.isLiked;
  }
}
