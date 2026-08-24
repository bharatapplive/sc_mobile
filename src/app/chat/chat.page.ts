import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ChatPage {

  searchText = '';

  chats = [
    {
      name: 'Rahul',
      message: 'Hey! How are you?',
      time: '10:32 AM',
      image: 'assets/avatar1.jpg',
      online: true,
      unread: 2
    },
    {
      name: 'Priya',
      message: 'See you tomorrow!',
      time: '9:15 AM',
      image: 'assets/avatar2.jpg',
      online: true,
      unread: 1
    },
    {
      name: 'Aman',
      message: 'Nice post 👍',
      time: 'Yesterday',
      image: 'assets/avatar3.jpg',
      online: false,
      unread: 0
    },
    {
      name: 'Neha',
      message: 'Thank you 😊',
      time: 'Yesterday',
      image: 'assets/avatar4.jpg',
      online: false,
      unread: 0
    }
  ];

  constructor(private router: Router) {}

  get filteredChats() {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.chats;
    }

    return this.chats.filter(chat =>
      chat.name.toLowerCase().includes(search)
    );
  }

  openChat(chat: any) {
    console.log('Opening chat with:', chat.name);
  }
}