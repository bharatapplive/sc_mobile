import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { register } from 'swiper/element/bundle';

// Register Swiper Custom Elements
register();

interface ReelItem {
  id: string;
  videoUrl: string;
  poster: string;
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
  standalone: false
})
export class ReelsPage implements OnInit {

  isMuted: boolean = true;

  constructor() { }
  ngOnInit(): void {

  }
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  toggleMute(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isMuted = !this.isMuted;
    this.videoPlayers?.forEach((playerRef) => {
      if (playerRef?.nativeElement) {
        playerRef.nativeElement.muted = this.isMuted;
      }
    });
  }

  // Verified fast-loading open CDN videos with posters
  reels: ReelItem[] = [
    {
      id: '1',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      username: 'ocean_explorer',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      description: 'Deep ocean tranquility 🌊 Explore the wonders of the blue planet #ocean #nature #deepblue',
      audioTrack: 'Ambient Waves - Ocean Sounds',
      likes: '48.2K',
      comments: '2,140',
      shares: '9.3K',
      isPlaying: true
    },
    {
      id: '2',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4',
      poster: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
      username: 'marine_life',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      description: 'Swimming alongside sea turtles in crystal clear waters 🐢🌊 #wildlife #diving',
      audioTrack: 'Original Audio - marine_life',
      likes: '62.4K',
      comments: '3,890',
      shares: '18.1K',
      isPlaying: false
    },
    {
      id: '3',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/dog.mp4',
      poster: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
      username: 'golden_pup',
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      description: 'Best friend enjoying a sunny day at the beach 🐶🐾 #dogs #goldenretriever #happydog',
      audioTrack: 'Happy Vibe Beats - Sunny Day',
      likes: '95.1K',
      comments: '5,420',
      shares: '27.4K',
      isPlaying: false
    },
    {
      id: '4',
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
      poster: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&auto=format&fit=crop&q=80',
      username: 'safari_adventures',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      description: 'Majestic giants walking freely in the savanna 🐘🌿 #safari #wildlife #africa',
      audioTrack: 'Savanna Sunset - Safari Sounds',
      likes: '34.8K',
      comments: '1,890',
      shares: '7.6K',
      isPlaying: false
    }
  ];

  // Handle slide transition: play current, pause others
  onSlideChange(event: any) {
    const swiper = event.detail?.[0] || (event.target as any)?.swiper;
    const activeIndex = swiper ? swiper.activeIndex : 0;

    this.videoPlayers?.forEach((playerRef, index) => {
      const video = playerRef.nativeElement;
      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
        this.reels[index].isPlaying = true;
      } else {
        video.pause();
        this.reels[index].isPlaying = false;
      }
    });
  }

  // Tap video to toggle Play / Pause
  togglePlayPause(index: number) {
    const video = this.videoPlayers?.toArray()[index]?.nativeElement;
    const reel = this.reels[index];

    if (video && reel) {
      if (video.paused) {
        video.play().catch(() => {});
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