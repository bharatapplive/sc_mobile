import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

interface Story {
  username: string;
  image: string;
}

interface Post {
  id: number;
  username: string;
  userImage: string;
  time: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage {

  // Notification count
  notificationCount: number = 3;

  // Loading status
  loading: boolean = false;


  // ==============================
  // STORIES
  // ==============================

  stories: Story[] = [
    {
      username: 'Rohit',
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      username: 'Priya',
      image: 'https://i.pravatar.cc/150?img=47'
    },
    {
      username: 'Rahul',
      image: 'https://i.pravatar.cc/150?img=33'
    },
    {
      username: 'Ananya',
      image: 'https://i.pravatar.cc/150?img=44'
    },
    {
      username: 'Arjun',
      image: 'https://i.pravatar.cc/150?img=11'
    },
    {
      username: 'Sneha',
      image: 'https://i.pravatar.cc/150?img=45'
    }
  ];


  // ==============================
  // POSTS
  // ==============================

  posts: Post[] = [

    {
      id: 1,

      username: 'Rohit Sharma',

      userImage:
        'https://i.pravatar.cc/150?img=12',

      time: '2h',

      caption:
        'Beautiful evening with amazing people! 🌅✨ Sometimes the simple moments become the best memories.',

      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',

      likes: 245,

      comments: 32,

      shares: 8,

      isLiked: false
    },


    {
      id: 2,

      username: 'Priya Verma',

      userImage:
        'https://i.pravatar.cc/150?img=47',

      time: '4h',

      caption:
        'Keep working hard. Your future self will thank you. 💪🔥',

      image:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80',

      likes: 189,

      comments: 21,

      shares: 5,

      isLiked: false
    },


    {
      id: 3,

      username: 'Rahul Singh',

      userImage:
        'https://i.pravatar.cc/150?img=33',

      time: '6h',

      caption:
        'Weekend vibes! 🏏❤️',

      image:
        'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1000&q=80',

      likes: 432,

      comments: 54,

      shares: 17,

      isLiked: false
    }

  ];


  // ==============================
  // CONSTRUCTOR
  // ==============================

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}


  // ==============================
  // LIKE POST
  // ==============================

  toggleLike(post: Post): void {

    post.isLiked = !post.isLiked;

    if (post.isLiked) {
      post.likes++;
    } else {
      post.likes--;
    }

  }


  // ==============================
  // CREATE POST
  // ==============================

  createPost(): void {

    window.location.href = '/create-post';

  }


  // ==============================
  // OPEN STORY
  // ==============================

  async openStory(story: Story): Promise<void> {

    const alert = await this.alertController.create({

      header: story.username,

      message: 'Story viewer will be connected here.',

      buttons: ['Close']

    });

    await alert.present();

  }


  // ==============================
  // OPEN COMMENTS
  // ==============================

  async openComments(post: Post): Promise<void> {

    const alert = await this.alertController.create({

      header: 'Comments',

      message:
        `${post.comments} comments are available on this post.`,

      buttons: ['Close']

    });

    await alert.present();

  }


  // ==============================
  // SHARE POST
  // ==============================

  async sharePost(post: Post): Promise<void> {

    post.shares++;

    const toast = await this.toastController.create({

      message: 'Post shared successfully!',

      duration: 1500,

      position: 'bottom'

    });

    await toast.present();

  }

}