import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { PreviousRouteServe } from 'src/app/core/previous-route-serve';
import { AuthService } from 'src/app/core/authcontroller/auth-service';
import { ContentAuthor, DirectMessage, DMAuthor, User } from 'src/app/core/authcontroller/authInterface';
import { slideRightToLeftAnimation } from 'src/app/animation/rightToleft.animation';
import { ChatService } from 'src/app/home/features/chatbox/chat-service';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../features/profile/profile-service';
import { slideLeftToRightAnimation } from 'src/app/animation/leftToright.animation';

@Component({
  selector: 'app-directmessage',
  templateUrl: './directmessage.page.html',
  styleUrls: ['./directmessage.page.scss'],
  standalone: false
})
export class DirectmessagePage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  private messageSub?: Subscription;

  roomId = '';
  messages: DirectMessage[] = [];
  newMessageText: string = '';
  
  activeUser: DirectMessage | null = null;
  activeUserFName: any | null = null;
  activeUserUName: any | null = null;
  activeUserProfilePic: string | null = null;
  profile: DMAuthor | null = null;

  //Modal..
  targetUser: User | null = null;
  isUserModalOpen = false;
  holdTimer: any;
  selectedRoom: any;
  holdDuration = 500; // Time in milliseconds (0.5s) to trigger hold

  constructor(
    private navCtrl: NavController,
    private readonly authServe: AuthService,
    private readonly chatServe: ChatService,
    private readonly profileServe: ProfileService
  ) {}

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    const session = this.authServe.getSession();
    if(!session.isAuthenticated)
    { 
      return;
    }
    
    // 1. Unpack navigation state
    const state = history.state;
    if (state && state.roomId) {
      this.roomId = state.roomId;
      this.activeUser = state.targetUser;
      this.profile = state.user;
      this.activeUserFName = state.targetFName;
      this.activeUserUName = state.targetUName;
      this.activeUserProfilePic = state.targetAvatar || null;
    }
        
    if (this.roomId && this.profile?.userId) {
      // 2. Ensure room socket connection is active
      this.chatServe.joinRoom(this.roomId, this.profile.userId);

      // 3. Mark unread messages as read
      this.chatServe.markMessagesAsRead(this.roomId, this.profile.userId);

      // 4. Fetch message history
      this.loadHistory(this.roomId);
    }

    // 5. Clean subscription before creating new one
    this.unsubscribe();

    // 6. Listen for live incoming messages for this room
    this.messageSub = this.chatServe.getMessages().subscribe({
      next: (message: DirectMessage) => {
        if (message && message.roomId === this.roomId) {
          this.messages.push(message);
          this.scrollToBottom();
        }
      },
      error: (err) => console.error('Error in direct message stream:', err)
    });
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

  // Step 2. Function of sending the message..
  onSend(){
    if(!this.newMessageText.trim() || !this.roomId || !this.profile) return;

    // Step 3. the main content where have roomid, senderID, etc...
    const payload: DirectMessage = {
      roomId: this.roomId,
      senderId: this.profile,  //// we can add more as per requirement...{receiver Id, name and image..}
      text: this.newMessageText,
      messageType: 'text'
    }

    // Step 4. Move to service..
    this.chatServe.sendMessage(payload);
    this.newMessageText = '';
    this.scrollToBottom();
  }

  loadHistory(roomId?: string) {
    if (!roomId) return;

    this.chatServe.getRoomHistory(roomId).subscribe({
      next: (res: DirectMessage[]) => {
        // Filter out messages sent by the logged-in user
        this.messages = res;
        this.scrollToBottom();
      },
      error: (err) => console.error('Error fetching chat history:', err)
    });
  }

  isMyMessage(senderId: DirectMessage['senderId']): boolean {
    if(!this.profile?.userId || !senderId) return false;
    const id = typeof senderId === 'object' ? senderId.userId : senderId;
    return id === this.profile.userId;
  }

  getSenderName(senderId: DirectMessage['senderId']): string {
    if (typeof senderId === 'object' && senderId !== null && 'authorFullName' in senderId) 
      {
        return senderId.authorFullName;
      }
    return 'User';
  }

  openUserInfo(){
    this.navCtrl.navigateForward('/home/directmessage/directmessageinfo',{
      animation: slideRightToLeftAnimation,
      state: {
        msg: this.messages,
        username: this.activeUserUName,
        fullname: this.activeUserFName,
        avatar: this.activeUserProfilePic
      }
    })
  }
  
  scrollToBottom() {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(300);
      }
    }, 100);
  }

  goBack(){
    this.navCtrl.navigateBack('/home/chat', {
      animation: slideLeftToRightAnimation
    })
    this.activeUser = null;
  }
}
