import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NoteItemComponent {
  @Input({ required: true }) note!: Note;
  @Output() noteClick = new EventEmitter<Note>();

  onNoteClick(): void {
    this.noteClick.emit(this.note);
  }
}
