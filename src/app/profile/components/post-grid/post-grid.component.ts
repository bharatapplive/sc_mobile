import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePost } from '../../models/post.model';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PostGridComponent {
  posts: ProfilePost[] = [];
  constructor(private profileService: ProfileService) {}
  ngOnInit() {
    this.posts = this.profileService.getPosts()
  }
}
