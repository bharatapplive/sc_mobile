import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../authcontroller/auth-service';
import { PreviousRouteServe } from '../previous-route-serve';
import { AudioTrack, ContentAuthor, CreatePostPayload } from '../authcontroller/authInterface';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: false,
})
export class PostPage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private router = inject(Router);
  private navCtrl = inject(NavController);
  private authServe = inject(AuthService);
  private previousRoute = inject(PreviousRouteServe);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);

  // User details
  profile: ContentAuthor | null = null;
  username: string = '';
  activeTab: 'POST' | 'REEL' | 'STORY' = 'POST';

  isSelected: boolean = false;
  isPosted: boolean = false;
  isCreateModel: boolean = false;
  isUploading: boolean = false;

  // Post content
  selectPost: string = '1';
  postUrl: string = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80';

  // Form State
  caption: string = '';
  location: string = '';

  // Media Input Fields
  newMediaUrl: string = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80';
  newMediaType: 'image' | 'video' = 'image';
  newAspectRatio: string = '1:1';

  //#region MEDIA OR AUDIO
  isMusicModalOpen: boolean = false;
  selectedAudio: AudioTrack | null = null;
  isPlayingPreview: boolean = false;
  previewAudioElement: HTMLAudioElement | null = null;
  playingTrackId: string | null = null;
  searchQuery: string = '';

  musicLibrary: AudioTrack[] = [
    {
      id: 'm1',
      title: 'Midnight City Beats',
      artist: 'SynthWave Sound',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80',
      duration: 30,
    },
    {
      id: 'm2',
      title: 'Acoustic Morning',
      artist: 'Lofi Vibes',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=120&q=80',
      duration: 15,
    },
    {
      id: 'm3',
      title: 'Summer Chill',
      artist: 'DJ Beats',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=120&q=80',
      duration: 60,
    },
  ];
  //#endregion

  posts = [
    { id: '1', url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '2', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '3', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '4', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '5', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '6', url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '7', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '8', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '9', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '10', url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '11', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
    { id: '12', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', mediaType: 'image', aspectRatio: 1 },
  ];

  @Input() captionText: string = '';
  @Input() maxLength: number = 2200;
  @Output() captionChange = new EventEmitter<string>();

  ngOnInit() {
    this.authServe.loadUserData().subscribe({
      next: (userData: any) => {
        const uid = userData?._id || userData?.id || '';
        this.profile = {
          userId: uid ? String(uid).trim() : '',
          authorName: userData?.username || '',
          avatarUrl: userData?.avatarUrl || '',
        };
        this.username = userData?.username || '';
      },
      error: (err: any) => {
        console.error('Failed to load user profile:', err);
      },
    });
  }

  triggerFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.postUrl = dataUrl;
        this.newMediaUrl = dataUrl;
        this.newMediaType = 'image';

        const newId = 'device_' + Date.now();
        this.selectPost = newId;
        this.posts.unshift({
          id: newId,
          url: dataUrl,
          mediaType: 'image',
          aspectRatio: 1,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onChangePost(id: string) {
    this.selectPost = id;
    const found = this.posts.find((item) => item.id === id);
    if (found) {
      this.postUrl = found.url;
      this.newMediaUrl = found.url;
      this.newMediaType = found.mediaType as 'image' | 'video';
    }
  }

  //#region MUSIC
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

    if (this.previewAudioElement) {
      this.stopAudioPreview();
    }

    this.previewAudioElement = new Audio(track.audioUrl);
    this.playingTrackId = track.id;

    this.previewAudioElement.play().catch((err) => {
      console.error('Audio playback error:', err);
      this.stopAudioPreview();
    });

    this.previewAudioElement.onended = () => {
      this.stopAudioPreview();
    };
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

  async onCreatePost() {
    if (!this.newMediaUrl && !this.postUrl) {
      this.showToast('Please select an image or photo first', 'warning');
      return;
    }

    const cleanName = (this.username || '').toLowerCase().trim();
    const parts = cleanName.split(/\s+/);
    const lastName = parts.slice(1).join('') || parts[0] || 'user';
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedUsername = `@${lastName}_${uniqueSuffix}`;

    const extractedHashtags = this.captionText
      ? this.captionText.match(/#[\w]+/g)?.map((tag) => tag.substring(1)) || []
      : [];

    const payload: CreatePostPayload = {
      author: this.profile,
      username: generatedUsername?.trim() || 'Anonymous',
      type: this.activeTab,
      caption: this.captionText.trim(),
      mediaUrl: this.newMediaUrl || this.postUrl,
      mediaType: this.newMediaType as 'image' | 'video',
      audio: this.selectedAudio,
      hashtags: extractedHashtags,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
    };

    const loading = await this.loadingCtrl.create({
      message: 'Uploading to Cloudinary & creating post...',
      spinner: 'crescent',
      backdropDismiss: false,
    });
    await loading.present();

    this.isUploading = true;

    this.authServe.createNewPost(payload).subscribe({
      next: async (res: any) => {
        this.isUploading = false;
        await loading.dismiss();
        this.showToast('Post published successfully! 🎉', 'success');

        this.isCreateModel = false;
        this.isSelected = false;
        this.selectedAudio = null;
        this.captionText = '';
        this.stopAudioPreview();

        // Navigate back to feeds
        this.router.navigateByUrl('/home/feeds');
      },
      error: async (err: any) => {
        this.isUploading = false;
        await loading.dismiss();
        console.error('[PostPage] Failed to publish post:', err);
        const serverError = err?.error?.message || 'Failed to publish post. Please try again.';
        this.showToast(serverError, 'danger');
      },
    });
  }

  openModal() {
    this.isCreateModel = !this.isCreateModel;
  }

  goBack() {
    let prevUrl = this.previousRoute.getPreviousUrl();
    if (!prevUrl || prevUrl === '/' || prevUrl === '/home' || prevUrl.includes('/post')) {
      prevUrl = '/home/feeds';
    }

    // Attempt standard router navigation first
    this.router.navigateByUrl(prevUrl).then((navigated) => {
      if (!navigated) {
        this.navCtrl.navigateRoot(prevUrl, { animated: true, animationDirection: 'back' });
      }
    }).catch(() => {
      this.navCtrl.navigateRoot('/home/feeds', { animated: true, animationDirection: 'back' });
    });
  }

  onImgError(event: any) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
    }
  }

  onTextChange() {
    this.captionChange.emit(this.captionText);
  }

  onChangeContentType(tab: 'POST' | 'REEL' | 'STORY') {
    this.activeTab = tab;
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}