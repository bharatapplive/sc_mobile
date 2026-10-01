import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SessionState } from '../core/services/auth.service';
import { MessageService } from '../core/services/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  standalone: false,
})
export class MessagePage implements OnInit {
  // properties
  session: any = {};
  users: any[] = [];
  messages: any[] = [];

  // step 1 constructor
  // dependency injectction
  constructor(
    private authService: AuthService, // this is for session state
    private messageService: MessageService, // so tht all logics will be in service and this will be only for UI
    private router: Router,
  ) {}

  //step 2 ngOnInit
  ngOnInit(): void {
    // took session related information in this.session
    this.session = this.authService.getSession();
    console.log('Session state:', this.session.user?.mobile);

    // step 3 get messages
    // now passing mobile from session state to getUsers method of messageService
    this.messageService.getUsers(this.session.user?.mobile || '').subscribe({
      next: (users) => {
        // in this.users property i am storing all users with whom current user has chat history
        this.users = users;
        console.log('Users:', users);
      },
      error: (error) => {
        console.error('Failed to load messages:', error);
      },
    });
  }
  navigateToMessageDetail(user: any): void {
    console.log('Navigating to message detail for user:', user);
    //step 2 save selected user in localstorage
    localStorage.setItem('selectedUser', JSON.stringify(user));

    // step 3 navigate to message detail page with userId as parameter
    void this.router.navigate(user?.id ? ['/home/message-detail', user.id] : ['/home/message-detail']).catch((error) => console.error('Could not open message detail:', error));
  }
}
