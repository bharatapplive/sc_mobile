import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../models/highlight.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HighlightsComponent {
  highlights: Highlight[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.highlights = this.profileService.getHighlights()
  }
}
