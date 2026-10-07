import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MessageService } from '../core/services/message';
import { Subscription } from 'rxjs';

interface DirectMessagePayload {
  roomId:   string;
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

  private messageSub?: Subscription;

  roomId = '';
  userId: string | null = null;
  session: any = {};
  user: any = null;
  messagePayload: DirectMessagePayload | null = null;
  messageText = '';
  messages: any[] =[];
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

    // Create roomId..
    //#region Himanshu Code...

    const currentUserId = this.session?.user?._id;

    if (currentUserId && this.userId) {
      this.roomId = [currentUserId, this.userId].sort().join('_');
    }
    
    // 5. Clean subscription before creating new one
    this.unsubscribe();

    // 6. Listen for live incoming messages for this room
    this.messageSub = this.messageServic.recivedMessages().subscribe({
      next: (message: any) => {
        if (message && message.roomId === this.roomId) {
          this.messages = [...this.messages, message];
        }
      },
      error: (err) => console.error('Error in direct message stream:', err)
    });
    
    // 6. Fetch room chat history
    if (this.roomId) {
      this.loadHistory(this.roomId);
    }
    //#endregion
  }

  //#region Himanshu Code..
  ionViewWillLeave() {
    this.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
      this.messageSub = undefined;
    }
  }

  loadHistory(roomId?: string) {
    if (!roomId) return;

    this.messageServic.getRoomHistory(roomId).subscribe({
      next: (res: DirectMessagePayload[]) => {
        // Filter out messages sent by the logged-in user
        this.messages = res;
      },
      error: (err) => console.error('Error fetching chat history:', err)
    });
  }
  //#endregion

  sendMessageHandler(): void {   
    const trimmedMessage = this.messageText.trim();
    if (!trimmedMessage) return;

    if (!this.session?.user) {
      console.error('Cannot send message: User session is missing.');
      return;
    }

    if (!this.user) {
      console.error('Cannot send message: Receiver info is missing.');
      return;
    }

    this.messagePayload = {
      roomId: this.roomId,
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

      message: trimmedMessage,
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
