import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: false
})
export class AddPage {

  constructor(private router: Router) {}

  createReel() {
    console.log('Create Reel');
    // this.router.navigate(['/create/reel']);
  }

  createEdits() {
    console.log('Create Edits');
  }

  createPost() {
    console.log('Create Post');
    // this.router.navigate(['/create/post']);
  }

  createStory() {
    console.log('Create Story');
    // this.router.navigate(['/create/story']);
  }

  createHighlights() {
    console.log('Create Highlights');
  }

  goLive() {
    console.log('Go Live');
  }
}
