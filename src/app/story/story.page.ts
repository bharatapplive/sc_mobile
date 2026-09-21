import { Component, inject, OnInit } from '@angular/core';
import { AuthService, SessionState } from '../core/services/auth.service';
import { StoryService } from '../core/services/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
  standalone: false,
})
export class StoryPage implements OnInit {
  readonly maxWords = 1024;
  session: SessionState | null = null;
  storyText = '';
  selectedImage: File | null = null;
  imagePreview = '';
  formError = '';
  isSubmitting = false;
  private readonly authService = inject(AuthService);
  private readonly storyService = inject(StoryService);

  ngOnInit(): void {
    // create a session function to get the current session state from the auth service and store it in the session property.
    const session = this.authService.getSession();
    this.session = session; // like token, user, isAuthenticated

  }

  get wordCount(): number {
    return this.storyText.trim() ? this.storyText.trim().split(/\s+/).length : 0;
  }

  enforceWordLimit(): void {
    if (this.wordCount <= this.maxWords) {
      return;
    }

    this.storyText = this.storyText.trim().split(/\s+/).slice(0, this.maxWords).join(' ');
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.formError = 'Please choose an image file.';
      input.value = '';
      return;
    }

    this.formError = '';
    this.selectedImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  //step 1 send data to backend using story service
  publishStoryHandler(): void {
    // // Validate form inputs
    if (!this.selectedImage || !this.storyText.trim()) {
      this.formError = 'Choose an image and add a story before sharing.';
      return;
    }
// step 2 create form data to send to backend (payload)
    const story = new FormData();
    story.append('image', this.selectedImage, this.selectedImage.name);
    story.append('text', this.storyText.trim());
    story.append('token', this.session?.token ?? '');
    story.append('user', JSON.stringify(this.session?.user ?? null));

    this.formError = '';
    this.isSubmitting = true;
    // console.log('Story submission:', {
    //   image: this.selectedImage,
    //   text: this.storyText.trim(),
    //   token: this.session?.token,
    //   user: this.session?.user,
    // });

    //step3 call story service to send data to backend and handle response
    this.storyService.createStory(story).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.formError = '';
      },
      error: (error) => {
        this.isSubmitting = false;
        this.formError = error?.error?.message || 'Unable to share your story. Please try again.';
        console.error('Story submission failed:', error);
      },
    });
  }
}