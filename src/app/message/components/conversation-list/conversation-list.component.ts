import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';
import { ConversationItemComponent } from '../conversation-item/conversation-item.component';
import { Conversation } from '../../models/conversation.model';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ConversationItemComponent]
})
export class ConversationListComponent {
  private messagesService = inject(MessagesService);
  private router = inject(Router);

  get conversations() {
    return this.messagesService.filteredConversations();
  }

  get requestsCount() {
    return this.messagesService.requestsCount();
  }

  onConversationSelect(conversation: Conversation): void {
    this.router.navigate(['/messages', conversation.id]);
  }

  onRequestsClick(): void {
    console.log('Message requests clicked!');
  }
}
