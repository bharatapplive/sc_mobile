import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-conversation-search',
  templateUrl: './conversation-search.component.html',
  styleUrls: ['./conversation-search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ConversationSearchComponent {
  private messagesService = inject(MessagesService);
  isFocused = false;

  get searchQuery() {
    return this.messagesService.searchQuery();
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.messagesService.setSearchQuery(input.value);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
