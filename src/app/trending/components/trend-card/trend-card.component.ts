import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonImg, IonRippleEffect } from '@ionic/angular/standalone';
import { TrendPost } from '../../models/trend.model';

@Component({
  selector: 'app-trend-card',
  templateUrl: './trend-card.component.html',
  styleUrls: ['./trend-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonImg, IonRippleEffect],
})
export class TrendCardComponent {
  @Input({ required: true }) post!: TrendPost;

  isPressed = false;

  onPress(): void  { this.isPressed = true;  }
  onRelease(): void { this.isPressed = false; }
}
