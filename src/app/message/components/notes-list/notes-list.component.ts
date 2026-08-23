import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../services/messages.service';
import { NoteItemComponent } from '../note-item/note-item.component';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  standalone: true,
  imports: [CommonModule, NoteItemComponent]
})
export class NotesListComponent {
  private messagesService = inject(MessagesService);

  get notes() {
    return this.messagesService.notes();
  }

  onNoteSelected(note: Note): void {
    console.log('Note clicked:', note);
  }
}
