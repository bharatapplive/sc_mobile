import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
  standalone: false
})
export class MessagesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addNote() {
  const note = prompt('What’s on your mind?');

  if (note && note.trim()) {
    const noteText = document.getElementById('noteText');

    if (noteText) {
      noteText.textContent = note.trim();
    }
  }
}

}
