import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';

import { register } from 'swiper/element/bundle';

register();


interface ReelItem {

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

  isSaved?: boolean;

  isFollowing?: boolean;

  verified?: boolean;

}


@Component({

  selector: 'app-reels',

  templateUrl: './reels.page.html',

  styleUrls: ['./reels.page.scss'],

  standalone: false

})


export class ReelsPage implements OnInit {


  @ViewChildren('videoPlayer')

  videoPlayers!: QueryList<
    ElementRef<HTMLVideoElement>
  >;


  /* =====================================================
     REELS DATA
  ===================================================== */

  reels: ReelItem[] = [

    {
      id: '1',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',

      username: 'travel.coder',

      userAvatar:
        'https://i.pravatar.cc/150?img=11',

      description:
        'Beautiful moments, big adventures and new memories. 🌍✨',

      audioTrack:
        'Original Audio - travel.coder',

      likes: '14.2K',

      comments: '1,082',

      shares: '3.4K',

      isPlaying: true,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '2',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',

      username: 'nature.vibes',

      userAvatar:
        'https://i.pravatar.cc/150?img=12',

      description:
        'Escape the routine and enjoy the view. 🌄🔥',

      audioTrack:
        'Trending Audio - Nature Vibes',

      likes: '28.5K',

      comments: '2,410',

      shares: '12.1K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '3',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',

      username: 'daily.reels',

      userAvatar:
        'https://i.pravatar.cc/150?img=13',

      description:
        'Good vibes only! Keep smiling and keep moving. 😎🔥',

      audioTrack:
        'Original Audio - daily.reels',

      likes: '42.8K',

      comments: '3,245',

      shares: '8.7K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: false
    },


    {
      id: '4',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',

      username: 'ride.with.me',

      userAvatar:
        'https://i.pravatar.cc/150?img=14',

      description:
        'Every road has a story. 🛣️❤️',

      audioTrack:
        'Road Trip Mix',

      likes: '18.9K',

      comments: '912',

      shares: '4.8K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '5',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',

      username: 'tech.daily',

      userAvatar:
        'https://i.pravatar.cc/150?img=15',

      description:
        'Technology is changing everything around us. 💻🚀',

      audioTrack:
        'TechVibes - Original Audio',

      likes: '32.1K',

      comments: '1,845',

      shares: '7.2K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '6',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',

      username: 'auto.world',

      userAvatar:
        'https://i.pravatar.cc/150?img=16',

      description:
        'Power, speed and adventure. 🚗🔥',

      audioTrack:
        'Car Edit - Original Audio',

      likes: '56.4K',

      comments: '4,321',

      shares: '15.8K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '7',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',

      username: 'adventure.life',

      userAvatar:
        'https://i.pravatar.cc/150?img=17',

      description:
        'Life is better when you are outside. 🌲🏔️',

      audioTrack:
        'Adventure Original',

      likes: '21.7K',

      comments: '1,231',

      shares: '5.6K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: false
    },


    {
      id: '8',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerColder.mp4',

      username: 'cinematic.world',

      userAvatar:
        'https://i.pravatar.cc/150?img=18',

      description:
        'Cinematic moments that deserve a replay. 🎬✨',

      audioTrack:
        'Cinematic Sound',

      likes: '37.2K',

      comments: '2,812',

      shares: '9.1K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '9',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerGrief.mp4',

      username: 'movie.edits',

      userAvatar:
        'https://i.pravatar.cc/150?img=19',

      description:
        'Some moments stay with you forever. 🎥❤️',

      audioTrack:
        'Movie Edit Audio',

      likes: '44.6K',

      comments: '3,120',

      shares: '10.4K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '10',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerLove.mp4',

      username: 'love.moments',

      userAvatar:
        'https://i.pravatar.cc/150?img=20',

      description:
        'Beautiful moments deserve beautiful memories. ❤️✨',

      audioTrack:
        'Love Vibes - Original',

      likes: '63.8K',

      comments: '5,410',

      shares: '18.2K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    },


    {
      id: '11',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMobiles.mp4',

      username: 'mobile.creator',

      userAvatar:
        'https://i.pravatar.cc/150?img=21',

      description:
        'Creating something amazing every single day. 📱🔥',

      audioTrack:
        'Creator Audio',

      likes: '19.5K',

      comments: '876',

      shares: '3.8K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: false
    },


    {
      id: '12',

      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerHappiness.mp4',

      username: 'happy.vibes',

      userAvatar:
        'https://i.pravatar.cc/150?img=22',

      description:
        'Choose happiness. Every single day. ☀️😊',

      audioTrack:
        'Happy Vibes - Original Audio',

      likes: '71.3K',

      comments: '6,201',

      shares: '21.4K',

      isPlaying: false,

      isLiked: false,

      isSaved: false,

      isFollowing: false,

      verified: true
    }

  ];


  constructor() {}


  ngOnInit(): void {

  }


  /* =====================================================
     SLIDE CHANGE
  ===================================================== */

  onSlideChange(event: any): void {

    const activeIndex =
      event?.detail?.[0]?.activeIndex ?? 0;

    const players =
      this.videoPlayers?.toArray() || [];


    players.forEach(
      (playerRef, index) => {

        const video =
          playerRef.nativeElement;


        if (index === activeIndex) {

          video.currentTime = 0;

          video.muted = true;


          const playPromise =
            video.play();


          if (playPromise) {

            playPromise.catch(() => {
              // Browser autoplay policy
            });

          }


          if (this.reels[index]) {

            this.reels[index].isPlaying = true;

          }

        } else {

          video.pause();

          video.currentTime = 0;


          if (this.reels[index]) {

            this.reels[index].isPlaying = false;

          }

        }

      }

    );

  }


  /* =====================================================
     PLAY / PAUSE
  ===================================================== */

  togglePlayPause(index: number): void {

    const video =
      this.videoPlayers
        ?.toArray()[index]
        ?.nativeElement;


    const reel =
      this.reels[index];


    if (!video || !reel) {

      return;

    }


    if (video.paused) {

      video.muted = true;


      const playPromise =
        video.play();


      if (playPromise) {

        playPromise.catch(() => {});

      }


      reel.isPlaying = true;

    } else {

      video.pause();

      reel.isPlaying = false;

    }

  }


  /* =====================================================
     LIKE
  ===================================================== */

  toggleLike(reel: ReelItem): void {

    reel.isLiked =
      !reel.isLiked;

  }


  /* =====================================================
     SAVE
  ===================================================== */

  toggleSave(reel: ReelItem): void {

    reel.isSaved =
      !reel.isSaved;

  }


  /* =====================================================
     FOLLOW
  ===================================================== */

  toggleFollow(reel: ReelItem): void {

    reel.isFollowing =
      !reel.isFollowing;

  }

}