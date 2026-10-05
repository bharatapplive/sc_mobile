import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MessageService } from '../core/services/message';

interface DirectMessagePayload {
  senderId: string | number | null;
  senderFirstName: string | null;
  senderLastName: string | null;
  senderEmail: string | null;
  senderUserName: string | null;
  receiverId: string | number | null;
  receiverFirstName: string | null;
  receiverLastName: string | null;
  receiverEmail: string | null;
  receiverUserName: string | null;
  message: string;
}

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.page.html',
  styleUrls: ['./message-detail.page.scss'],
  standalone: false,
})
export class MessageDetailPage implements OnInit {
  @ViewChild('chatContent') private chatContent?: IonContent;

  userId: string | null = null;
  session: any = {};
  user: any = null;
  messagePayload: DirectMessagePayload | null = null;
  messageText = '';
  //step 4
// dependency inject of activated route and 
// auth service to get the current user or session state 
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService, // this is for session state
    private messageServic: MessageService
  ) {}

  // step 5 ngOnInit method 
  ngOnInit(): void {
  //step 6 get the userId from the route parameters and the selected user from local storage, and also get the session state from the auth service
    this.userId = this.route.snapshot.paramMap.get('userId');

    // step 7 get the selected user from local storage and parse it to an object
    // receiver (selected user)
    this.user =JSON.parse(localStorage.getItem('selectedUser') || 'null');

    // step 8 get the session state from the auth service and log the user name to the console
    // sender information (current logged in user)
    this.session = this.authService.getSession();
    console.log('session user:', this.session.user?.userName);
  }

  sendMessageHandler(): void {   
    if (!this.messageText.trim()) return;    

    this.messagePayload = {
      senderId: this.session?.user._id,
      senderFirstName: this.session?.user.firstName ?? null,
      senderLastName: this.session?.user.lastName ?? null,
      senderEmail: this.session?.user.email ?? null,
      senderUserName: this.session?.user.userName ,
      receiverId: this.user._id ,
      receiverFirstName: this.user.firstName,
      receiverLastName: this.user.lastName ,
      receiverEmail: this.user.email ,
      receiverUserName: this.user.userName ,

      message: this.messageText.trim(),
    };

    this.messageServic.sendMessage(this.messagePayload);
    this.messageText = '';

    //step 9-> component->service-> API (controller-> service-> db)
    console.log('Direct message payload:', this.messagePayload);
  }

  ionViewDidEnter(): void {
    requestAnimationFrame(() => this.chatContent?.scrollToBottom(0));
  }

}
