import { Component, Input, ViewChild, ElementRef, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message, ChatUser } from '../../models/message.model';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { TypingIndicatorComponent } from '../typing-indicator/typing-indicator.component';

interface GroupedMessages {
  dateLabel: string;
  messages: Message[];
}

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MessageBubbleComponent, TypingIndicatorComponent]
})
export class MessageListComponent implements AfterViewChecked, OnChanges {
  @Input({ required: true }) messages: Message[] = [];
  @Input() user!: ChatUser;
  @Input() isTyping = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  showScrollBottomBtn = false;
  private shouldScrollToBottom = true;

  trackByMsgId(index: number, msg: Message): string {
    return msg.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] || changes['isTyping']) {
      this.shouldScrollToBottom = true;
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  get groupedMessages(): GroupedMessages[] {
    if (!this.messages || this.messages.length === 0) {
      return [];
    }

    return [
      {
        dateLabel: 'Today',
        messages: this.messages
      }
    ];
  }

  onScroll(): void {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    this.showScrollBottomBtn = !isAtBottom;
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
