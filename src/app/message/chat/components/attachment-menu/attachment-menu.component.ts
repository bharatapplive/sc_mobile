import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attachment-menu',
  templateUrl: './attachment-menu.component.html',
  styleUrls: ['./attachment-menu.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AttachmentMenuComponent {
  @Output() selectOption = new EventEmitter<string>();
  @Output() closeMenu = new EventEmitter<void>();

  options = [
    { id: 'photo', label: 'Photo & Video', icon: 'image', color: '#8b5cf6' },
    { id: 'camera', label: 'Camera', icon: 'photo_camera', color: '#ec4899' },
    { id: 'document', label: 'Document', icon: 'description', color: '#3b82f6' },
    { id: 'location', label: 'Location', icon: 'location_on', color: '#10b981' }
  ];

  onSelect(id: string): void {
    this.selectOption.emit(id);
    this.closeMenu.emit();
  }

  onBackdropClick(): void {
    this.closeMenu.emit();
  }
}
