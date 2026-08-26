import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, CreatePostPayload } from '../auth-service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PreviousRouteServe } from '../previous-route-serve';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: false
})
export class PostPage implements OnInit {

  //User details...
  username: string = '';
  _id:string = '';
  activeTab: string = 'Post';
  
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
        this.username = userData.username;
        this._id = userData?._id ? String(userData._id).trim() : '';
        console.log(this._id);
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

  onCreatePost(){

    if(!this._id){
      alert('User session not found. Please log in again.');
      return;
    }

    const cleanName = (this.username || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ''); // strip spaces and special chars
    
      const uniqueSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      const generatedUsername = `${cleanName}_${uniqueSuffix}`;
      
      // Helper to extract #hashtags into an array
      const extractedHashtags = this.caption
        ? (this.caption.match(/#[\w]+/g)?.map(tag => tag.substring(1)) || [])
        : [];

      const payload: CreatePostPayload = {      
        userId: this._id ? String(this._id).trim() : '',
        author: generatedUsername?.trim() || 'Anonymous',
        caption: this.captionText.trim(),
        mediaUrl: this.newMediaUrl,
        mediaType: this.newMediaType as 'image' | 'video',
        hashtags: extractedHashtags,
        likesCount: 0,
        commentsCount: 0
      };

    this.authServe.createNewPost(payload).subscribe({
        next: (user) => {
          alert(`${user} successfully updated`);
          // Reset post creation portal values
          
          this.navCtrl.navigateBack('/home/feeds');
          this.isSelected = false;
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
}
