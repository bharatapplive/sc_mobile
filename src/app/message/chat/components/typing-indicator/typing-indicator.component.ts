import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typing-indicator',
  templateUrl: './typing-indicator.component.html',
  styleUrls: ['./typing-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TypingIndicatorComponent {
  @Input() userName = 'Partner';
}
