import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MessageBubbleComponent {
  @Input({ required: true }) message!: Message;
  @Input() currentUserId = 'me';

  get isOutgoing(): boolean {
    return this.message.senderId === this.currentUserId;
  }

  get statusText(): string {
    switch (this.message.status) {
      case 'sending':
        return 'Sending';
      case 'sent':
        return 'Sent';
      case 'delivered':
        return 'Delivered';
      case 'read':
        return 'Read';
      default:
        return '';
    }
  }
}
