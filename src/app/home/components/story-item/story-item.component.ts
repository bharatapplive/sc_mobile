import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAvatar } from '@ionic/angular/standalone';
import { Story } from '../../models/feed.model';

@Component({
  selector: 'app-story-item',
  templateUrl: './story-item.component.html',
  styleUrls: ['./story-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonAvatar],
})
export class StoryItemComponent {
  @Input({ required: true }) story!: Story;
}
