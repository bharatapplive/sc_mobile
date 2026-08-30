import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../authcontroller/auth-service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PreviousRouteServe } from '../previous-route-serve';
import { AudioTrack, ContentAuthor, CreatePostPayload } from '../authcontroller/authInterface';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: false
})
export class PostPage implements OnInit {

  //User details...  
  profile: ContentAuthor | null = null;
  username: string = '';
  activeTab: 'POST' | 'REEL' | 'STORY' = 'POST';
  
  isSelected: boolean = false;
  isPosted:boolean = false;
  isCreateModel: boolean = false;

  // Post content...
  selectPost: string = '';
  postUrl: string = 'assets/images/Magal.avif';
  
  // Form State
  caption: string = '';

  // Temporary Media Input Fields
  newMediaUrl: string = 'assets/images/Magal.avif';
  newMediaType: 'image' | 'video' = 'image';
  newAspectRatio: string = '1:1';
  
  //#region MEDIA OR AUDIO
  // Music State
  isMusicModalOpen: boolean = false;
  selectedAudio: AudioTrack | null = null;
  isPlayingPreview: boolean = false;
  previewAudioElement: HTMLAudioElement | null = null;
  playingTrackId: string | null = null;
  searchQuery: string = '';

  // Mock Available Music Library (Replace with backend API call if needed)
  musicLibrary: AudioTrack[] = [
    {
      id: 'm1',
      title: 'Midnight City Beats',
      artist: 'SynthWave Sound',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      coverUrl: 'assets/images/Post1.jpg',
      duration: 30
    },
    {
      id: 'm2',
      title: 'Acoustic Morning',
      artist: 'Lofi Vibes',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      coverUrl: 'assets/images/Post2.jpg',
      duration: 15
    },
    {
      id: 'm3',
      title: 'Summer Chill',
      artist: 'DJ Beats',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      coverUrl: 'assets/images/rock.avif',
      duration: 60
    }
  ]

  //#endregion

  posts = [
    {id:'1', url:'assets/images/Magal.avif', mediaType: 'image', aspectRatio: 1/1},
    {id:'2', url:'assets/images/barbidoll.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'3', url:'assets/images/rock.avif', mediaType: 'image', aspectRatio: 1/1},
    {id:'4', url:'assets/images/luna_art.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'5', url:'assets/images/Cutipie.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'6', url:'assets/images/Slex.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'7', url:'assets/images/neo_pixel.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'8', url:'assets/images/travel_joy.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'9', url:'assets/images/Post1.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'10', url:'assets/images/Post2.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'11', url:'assets/images/Slex.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'12', url:'assets/images/neo_pixel.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'13', url:'assets/images/travel_joy.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'14', url:'assets/images/Post1.jpg', mediaType: 'image', aspectRatio: 1/1},
    {id:'15', url:'assets/images/Post2.jpg', mediaType: 'image', aspectRatio: 1/1}
  ]

  @Input() captionText: string = '';
  @Input() maxLength: number = 2200;
  @Output() captionChange = new EventEmitter<string>();

  constructor(    
    private router:Router,
    private navCtrl: NavController,
    private readonly authServe: AuthService,
    private readonly previousRoute: PreviousRouteServe
  ) { }

  ngOnInit() {
    this.authServe.loadUserData().subscribe({
      next: (userData) => {
        this.profile = {
          ...this.profile,
          userId: userData?._id ? String(userData._id).trim() : '',
          authorName: userData?.username || '',
          avatarUrl: userData?.avatarUrl || '',
        };
        this.username = userData.username;
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      },
    });
  }

  onChangePost(id: string){
    this.selectPost = id;
    
    this.posts.filter(item => {
      if(item.id === this.selectPost){
        this.postUrl = item.url
        this.newMediaUrl = this.postUrl
        this.newMediaType = item.mediaType as 'image' | 'video'; 
      }
    });
  }

  //#region MUSIC..

  openMusicModal() {
    this.isMusicModalOpen = true;
  }

  closeMusicModal() {
    this.isMusicModalOpen = false;
    this.stopAudioPreview();
  }

  previewTrack(track: AudioTrack, event: Event) {
    event.stopPropagation();
    if (this.playingTrackId === track.id) {
      this.stopAudioPreview();
      return;
    }

    if(this.previewAudioElement){
      this.stopAudioPreview();
    }

    this.previewAudioElement = new Audio(track.audioUrl);
    this.playingTrackId = track.id;
    
    this.previewAudioElement.play().catch(err => {
      console.error('Audio playback error:', err);
      this.stopAudioPreview();
    });

    this.previewAudioElement.onended = () =>{
      this.stopAudioPreview();
    }
  }

  selectMusicTrack(track: AudioTrack) {
    this.selectedAudio = track;
    this.closeMusicModal();
  }

  removeSelectedMusic(event: Event) {
    event.stopPropagation();
    this.selectedAudio = null;
    this.stopAudioPreview();
  }

  private stopAudioPreview() {
    if (this.previewAudioElement) {
      this.previewAudioElement.pause();
      this.previewAudioElement = null;
    }
    this.playingTrackId = null;
  }
//#endregion

  onCreatePost(){

    // 1. get the fullname and change to lower..
    const cleanName = (this.username || '').toLowerCase().trim(); // strip spaces and special chars
    
    // 2. Split into parts
    const parts = cleanName.split(/\s+/); // Splits by one or more spaces

    const lastName = parts.slice(1).join('') || '';

    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const generatedUsername = `@${lastName}_${uniqueSuffix}`;
    
    // Helper to extract #hashtags into an array
    const extractedHashtags = this.caption? (this.caption.match(/#[\w]+/g)?.map(tag => tag.substring(1)) || []) : [];

    const payload: CreatePostPayload = {      
      author: this.profile,
      username: generatedUsername?.trim() || 'Anonymous',
      type: this.activeTab,
      caption: this.captionText.trim(),
      mediaUrl: this.newMediaUrl,
      mediaType: this.newMediaType as 'image' | 'video',
      audio: this.selectedAudio,
      hashtags: extractedHashtags,
      likesCount: 0,
      commentsCount: 0,
      sharesCount:0
    };

    this.authServe.createNewPost(payload).subscribe({
        next: (user) => {
          alert(`Post successfully updated`);
          // Reset post creation portal values
          
          this.navCtrl.navigateBack('/home/feeds');
          this.isSelected = false;
          this.selectedAudio = null;
          this.stopAudioPreview();
        },
        error: (err) => {
          // Shows the exact error message from NestJS (e.g. "Username or Email already exists.")
          const serverError = err.error?.message || 'Registration failed. Please try again.';
          alert(serverError);
        }
      });
  }

  openModal(){
    this.isCreateModel = !this.isCreateModel;
  }

  goBack(){
    const prevUrl = this.previousRoute.getPreviousUrl();

    if(prevUrl){
      this.navCtrl.navigateBack(prevUrl);
    }else{
      this.navCtrl.navigateBack('/home');
    }
  }

  onTextChange() {
    this.captionChange.emit(this.captionText);
  }

  onChangeContentType(tab: any){
    this.activeTab = tab;
  }
}
