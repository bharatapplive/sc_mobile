import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SessionState } from '../core/services/auth.service';
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
  createdAt?: string
}

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
  private messageSub?: Subscription;
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

    //#region Himanshu Code...
    this.messageService.connectSocket(this.session?.token)
    // Clean old subscription if existing
    this.unsubscribe();

    //Recevier msg here....
    this.messageSub = this.messageService.recivedMessages().subscribe({
      next: (message: any) => {
        if (message && message.roomId) {
          this.updateRoomSummary(message);
        }
      },
      error: (err) => console.error('Error in message stream:', err)
    });

    this.callAllRooms();
    //#endregion
  }
  
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

  navigateToMessageDetail(user: any): void {
    console.log('Navigating to message detail for user:', user);
    //step 2 save selected user in localstorage
    localStorage.setItem('selectedUser', JSON.stringify(user));

    // step 3 navigate to message detail page with userId as parameter
    void this.router.navigate(user?.id ? ['/home/message-detail', user.id] : ['/home/message-detail']).catch((error) => console.error('Could not open message detail:', error));
  }

  //#region  Himanshu Code...
  callAllRooms(event?: any){
    this.messageService.getAllRooms().subscribe({
      next: (res)=>{
        const ids = res.map((room:any)=> room.roomId);
        if(ids.length > 0){
          ids.forEach((id:any)=>{
            const userIds = id.split('_');
            const otherUserId = userIds.some((uid: string) => uid === this.session?.user?._id);
            if(!otherUserId) return;
            this.loadHistory([id]);
          });
        }
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  // Load Whole room history...
  loadHistory(roomId?: string[]) {
    if (!roomId || roomId.length === 0) return;

    roomId?.forEach(id=>{
      this.messageService.getRoomHistory(id).subscribe({
        next: (res: DirectMessagePayload[]) => {
          const list = Array.isArray(res) ? res : [];
          if (list.length === 0) return;

          // 1. Get the most recent message in this specific room
          const lastMsg = list[list.length - 1];

          // 2. Find the message sent by the other participant
          const filteredMessages = list.filter(item => item.senderId !== this.session.user?._id);

          // 3. Ignore if no incoming msg from otheruser
          if(filteredMessages.length === 0) return;
          
          // 4. Take Latest incoming message from other user.. 
          const targetMsg = filteredMessages[filteredMessages.length - 1]

          // 5. Construct the room summary item
          const roomSummary: DirectMessagePayload = {...targetMsg, roomId: id, message: lastMsg?.message, createdAt: lastMsg?.createdAt};

          this.updateRoomSummary(roomSummary);
        },
        error: (err) => console.error('Error fetching chat history:', err)
      });
    })
  }

  // Update or insert room summary when a message arrives
  private updateRoomSummary(newMessage: DirectMessagePayload) {
    const index = this.messages.findIndex((m) => m.roomId === newMessage.roomId);

    if (index !== -1) {
      // Room exists: merge updated fields
      this.messages[index] = { ...this.messages[index], ...newMessage };
    } else {
      // New room: prepend to array
      this.messages.push(newMessage);
    }

    // Always keep array sorted so the most recent timestamp is at top
    this.messages = [...this.messages].sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return timeB - timeA; // Descending order (newest first)
    });
  }
  //#endregion
}
