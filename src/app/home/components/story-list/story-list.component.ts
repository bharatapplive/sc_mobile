import { Component } from '@angular/core';
import { StoriesService } from '../../services/stories.service';
import { Story } from '../../models/feed.model';
import { StoryItemComponent } from '../story-item/story-item.component';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss'],
  standalone: true,
  imports: [StoryItemComponent]
})
export class StoryListComponent {
  stories: Story[] = [];
  constructor(private storiesService: StoriesService) { }

  ngOnInit() {
   this.stories = this.storiesService.getStories();
  }

}
