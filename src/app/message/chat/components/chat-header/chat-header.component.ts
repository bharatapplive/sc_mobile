import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatUser } from '../../models/message.model';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ChatHeaderComponent {
  @Input({ required: true }) user!: ChatUser;
  @Output() viewProfile = new EventEmitter<void>();
  @Output() clearChat = new EventEmitter<void>();

  private router = inject(Router);
  public showMenu = false;

  goBack(): void {
    this.router.navigate(['/messages']);
  }

  onAvatarClick(): void {
    this.viewProfile.emit();
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  closeMenu(): void {
    this.showMenu = false;
  }

  onOptionClick(action: string): void {
    this.closeMenu();
    if (action === 'profile') {
      this.viewProfile.emit();
    } else if (action === 'clear') {
      this.clearChat.emit();
    }
  }
}
