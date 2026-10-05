import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/home/features/profile/profile-service';
import { ChatService } from 'src/app/home/features/chatbox/chat-service';
import { ContentAuthor, DirectMessage, DirectMessagePayload, Followers, User } from 'src/app/core/authcontroller/authInterface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/authcontroller/auth-service';
import { NavController } from '@ionic/angular';
import { slideLeftToRightAnimation } from 'src/app/animation/leftToright.animation';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.page.html',
  styleUrls: ['./chatbox.page.scss'],
  standalone: false
})

export class ChatboxPage implements OnInit, OnDestroy {
  private messageSub?: Subscription;

  roomId = '';
  messages: DirectMessagePayload[] = [];

  profile: ContentAuthor | null = null;
  user: User | null = null;
  avatarUrl?: string = '';
  selectedTag: string = 'Primary';

  tags: string[] = ['Primary', 'Requests', 'General'];

  follows: User[] = []
  followerList: any[] = [];
  followingList: any[] =[];

  constructor(
    private readonly authServe: AuthService,
    private readonly profileServe: ProfileService,
    private readonly chatServe: ChatService,
    private readonly navCtrl: NavController
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){

    const session = this.authServe.getSession();
    if(!session.isAuthenticated || !session.token){
      return
    }

    this.chatServe.connectSocket(session?.token);

    // Clean old subscription if existing
    this.unsubscribe();

    this.messageSub = this.chatServe.getMessages().subscribe({
      next: (message: DirectMessagePayload) => {
        if (message && message.receiverId) {
          this.updateRoomSummary(message);
        }
      },
      error: (err) => console.error('Error in message stream:', err)
    });

    this.loadUserData();
    this.updateFollowList();
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

  handleRefresh(event: any){
    this.loadUserData(event);
    this.callAllRooms(event);
  }

  //#region Loading Actual Data..
  loadUserData(event?: any){
    this.profileServe.loadUserData().subscribe({
      next: (userData) => {
        this.user = userData;
        this.profile = {
          ...this.profile,
          userId: userData?._id ? String(userData._id).trim() : '',
          authorName: userData?.fullname || '',
          avatarUrl: userData?.avatarUrl || '',
        };
        this.avatarUrl = userData.avatarUrl?.trim();
        this.callAllRooms();
        if (event) {
          event.target.complete();
        }
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
        if (event) {
          event.target.complete();
        }
      },
    });
  }

  callAllRooms(event?: any){
    this.chatServe.getAllRooms().subscribe({
      next: (res)=>{
        const ids = res.map((room: any)=> room.roomId);
        
        if(ids.length > 0){
          ids.forEach((id:any)=>{
            const userIds = id.split('_');
            const otherUserId = userIds.filter((uid: string) => uid === this.user?._id);
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
  loadHistory(roomID?: string[]) {
    if (!roomID || roomID.length === 0) return;

    roomID?.forEach(id=>{
      this.chatServe.getRoomHistory(id).subscribe({
        next: (res: DirectMessagePayload[]) => {
          const list = Array.isArray(res) ? res : [];
          
          if (list.length === 0) return;

          // 1. Get the most recent message in this specific room
          const lastMsg = list[list.length - 1];

          // 2. Find the message sent by the other participant
          const filteredMessages = list.filter(item => item.senderId !== this.user?._id);
          console.log(filteredMessages)

          // 3. Ignore if no incoming msg from otheruser
          if(filteredMessages.length === 0) return;
          
          // 4. Take Latest incoming message from other user.. 
          const targetMsg = filteredMessages[filteredMessages.length - 1]

          // 5. Construct the room summary item
          const roomSummary: DirectMessagePayload = {...targetMsg, message: lastMsg?.message, createdAt: lastMsg?.createdAt};

          this.updateRoomSummary(roomSummary);
        },
        error: (err) => console.error('Error fetching chat history:', err)
      });
    })
  }

  // Update or insert room summary when a message arrives
  private updateRoomSummary(newMessage: DirectMessagePayload) {
    const index = this.messages.findIndex((m) => m.receiverId === newMessage.receiverId);

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

    console.log(this.messages)
  }

  //#endregion

  //#region Getting details...
  isMessageRead(message: DirectMessage | any): boolean {
    if (!message || !message.readBy || !this.user?._id) return false;
    return message.readBy.some((id: any) => id === this.user?._id);
  }

  getSenderName(senderId: ContentAuthor | string | null | undefined): string {
    if(!senderId) return 'User';
    if (typeof senderId === 'object' && senderId !== null && 'authorName' in senderId) {
      return senderId.authorName || 'User';
    }
    return 'User';
  }

  getSenderAvatar(senderId: ContentAuthor | string | null | undefined): string {
    const defaultAvatar = 'assets/images/default-avatar.png';
    if(!senderId) return defaultAvatar;

    if (typeof senderId === 'object' && senderId !== null && 'avatarUrl' in senderId) {
      return senderId.avatarUrl || defaultAvatar;
    }
    return defaultAvatar;
  }

  //#endregion

  //#region Following/Follower Content....
  onClickFollow(item: any){
    const otherUserID = item?._id;

    const payLoad: Followers = {
      followerId: this.user?._id??'',
      followingId: otherUserID
    };

    this.profileServe.createNewFollower(payLoad).subscribe({
      next:()=>{
        this.updateFollowList();
      },
      error(er){
        console.log(er);
      }
    })
  }

  updateFollowList(event?: any){
    this.profileServe.callAllFollowers().subscribe({
      next: ((response)=>{
        const list = Array.isArray(response) ? response : [];

        // Step-1. Get the list of user whom i followed
        const following = list.filter(item => item.followerId === this.user?._id);

        // Step-2. Get the list of user the follow my account..
        const follower = list.filter(item => item.followingId === this.user?._id);

        this.authServe.allUsers().subscribe({
          next:(data: User[])=>{
            const list = data;

            // Step-3. Fetch the user whom i followed..
            const request1 = new Set(following.map(item => item.followingId));
            this.followingList = list.filter(item => request1.has(item._id));

            // Step-4. Fetch the user that following my account..
            const request2 = new Set(follower.map(item => item.followerId));
            this.followerList = list.filter(item => request2.has(item._id));

            // Step-5. Filter only those user who didn't in my following list..
            this.follows = list.filter(item=>item._id !== this.user?._id && !request1.has(item._id));

          }
        });

        if (event) {
          event.target.complete();
        }
      }),
      error(er){
        console.log(er);
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  isFollower(item: any): boolean{
    const id = item._id;
    return this.followerList.some((follow) => follow._id === id
    );
  }
  //#endregion

  //#region Navigate the path / route...
   openPrivateChat(targetUser: any){
    if(!this.user?._id || !targetUser) return;

    // 1. Generate a unique room ID based on the two user IDs (sorted to ensure consistency)
    this.roomId = [this.user._id, targetUser._id].sort().join('_');

    // 2. Join socket room on backend
    this.chatServe.joinRoom(this.roomId, this.user._id);

    // 3. Navigate forward passing room context
    this.navCtrl.navigateForward('/home/directmessage', {
      animation: slideLeftToRightAnimation,
      state:{
        user: this.profile,
        roomId: this.roomId,
        targetUser: targetUser,
        targetName: targetUser?.fullname,
        targetAvatar: targetUser?.avatarUrl
      }
    });
  }

  openGroupChat(item: any){
    if(!item.roomId) return;
    this.chatServe.markMessagesAsRead(item.roomId, this.user?._id??'').subscribe();
    this.navCtrl.navigateForward('/home/directmessage', {
      animation: slideLeftToRightAnimation,
      state:{
        user: this.profile,
        roomId: item.roomId,
        targetUser: item,
        targetName: item?.senderId?.authorName,
        targetAvatar: item?.senderId?.avatarUrl
      }
    });
  }

  //#endregion
  
  selectTag(tag: string) {
    this.selectedTag = tag;
  }

  doRefresh(event: any) {
    this.updateFollowList(event);
  }

}
