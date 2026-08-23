import { Component, Input } from '@angular/core';
import { IonCard, IonRippleEffect } from '@ionic/angular/standalone';
import { TrendPost } from '../../models/trend.model';

@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonRippleEffect],
})
export class FeaturedCardComponent {
  @Input({ required: true }) post!: TrendPost;

  isPressed = false;

  onPress(): void  { this.isPressed = true;  }
  onRelease(): void { this.isPressed = false; }
}
