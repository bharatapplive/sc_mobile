import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttachmentMenuComponent } from '../attachment-menu/attachment-menu.component';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';

@Component({
  selector: 'app-message-composer',
  templateUrl: './message-composer.component.html',
  styleUrls: ['./message-composer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, AttachmentMenuComponent, EmojiPickerComponent]
})
export class MessageComposerComponent {
  @Output() sendMessage = new EventEmitter<{ text: string; type?: 'text' | 'image' | 'file'; imageUrl?: string }>();
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

  messageText = '';
  showAttachmentMenu = false;
  showEmojiPicker = false;

  get canSend(): boolean {
    return this.messageText.trim().length > 0;
  }

  onSend(): void {
    if (!this.canSend) return;
    const text = this.messageText.trim();
    this.sendMessage.emit({ text, type: 'text' });
    this.messageText = '';
    this.showAttachmentMenu = false;
    this.showEmojiPicker = false;
    
    setTimeout(() => {
      this.messageInput?.nativeElement?.focus();
    }, 50);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }

  toggleAttachmentMenu(event: Event): void {
    event.stopPropagation();
    this.showAttachmentMenu = !this.showAttachmentMenu;
    if (this.showAttachmentMenu) {
      this.showEmojiPicker = false;
    }
  }

  toggleEmojiPicker(event: Event): void {
    event.stopPropagation();
    this.showEmojiPicker = !this.showEmojiPicker;
    if (this.showEmojiPicker) {
      this.showAttachmentMenu = false;
    }
  }

  onEmojiSelect(emoji: string): void {
    this.messageText += emoji;
    this.messageInput?.nativeElement?.focus();
  }

  onAttachmentSelect(option: string): void {
    this.showAttachmentMenu = false;
    if (option === 'photo') {
      this.sendMessage.emit({
        text: 'Shared a photo',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'
      });
    } else {
      this.sendMessage.emit({
        text: `📎 Shared ${option}`,
        type: 'text'
      });
    }
  }
}
