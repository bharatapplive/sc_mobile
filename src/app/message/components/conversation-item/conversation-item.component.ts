import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ConversationItemComponent {
  @Input({ required: true }) conversation!: Conversation;
  @Output() selectConversation = new EventEmitter<Conversation>();

  onCardClick(): void {
    this.selectConversation.emit(this.conversation);
  }
}
