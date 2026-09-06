import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class EmojiPickerComponent {
  @Output() selectEmoji = new EventEmitter<string>();
  @Output() closePicker = new EventEmitter<void>();

  emojis: string[] = [
    '😀', '😂', '❤️', '👍', '😍', '🔥', '🎉',
    '😎', '😭', '🤔', '👀', '🙌', '💯', '✨',
    '🥳', '💜', '👏', '🚀', '🎈', '💬', '🌟',
    '🤝', '⚡', '🤩', '🎯', '🥰', '🙏', '✌️'
  ];

  onEmojiClick(emoji: string): void {
    this.selectEmoji.emit(emoji);
  }

  onBackdropClick(): void {
    this.closePicker.emit();
  }
}
