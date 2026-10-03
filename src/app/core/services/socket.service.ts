import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/lazy';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { ChatMessage, MessageService } from './message.service';
import { PostAuthor } from './post.service';

export interface IncomingMessage extends ChatMessage {
    sender?: PostAuthor;
}

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket?: Socket;

    newMessage$ = new Subject<IncomingMessage>(); // naya message aaya
    read$ = new Subject<{ by: string }>(); // saamne wale ne padh liya
    unreadCount = signal(0); // Messages tab ka red badge
    activeChatUserId: string | null = null; // jo chat abhi khuli hai

    constructor(
        private auth: AuthService,
        private messageService: MessageService,
        private toastCtrl: ToastController,
        private router: Router,
    ) {
        // login hote hi connect, logout pe disconnect
        this.auth.user$.subscribe((user) => (user ? this.connect() : this.disconnect()));
    }

    refreshUnread() {
        this.messageService.conversations().subscribe({
            next: (list) => this.unreadCount.set(list.reduce((sum, c) => sum + c.unread, 0)),
            error: () => { },
        });
    }

    private connect() {
        if (this.socket) return; // pehle se connected/connecting
        this.socket = io(environment.apiUrl, { auth: { token: this.auth.getToken() } });

        this.socket.on('message:new', (msg: IncomingMessage) => {
            this.newMessage$.next(msg);
            const myId = this.auth.currentUser?._id;
            // mujhe aaya hai aur woh chat khuli nahi hai, toh badge + popup
            if (msg.to === myId && msg.from !== this.activeChatUserId) {
                this.unreadCount.update((n) => n + 1);
                this.showToast(msg);
            }
        });

        this.socket.on('message:read', (e: { by: string }) => this.read$.next(e));
        this.refreshUnread();
    }

    private disconnect() {
        this.socket?.disconnect();
        this.socket = undefined;
        this.unreadCount.set(0);
    }

    private async showToast(msg: IncomingMessage) {
        const name = msg.sender?.firstName ?? 'Someone';
        const text = msg.text.length > 60 ? msg.text.slice(0, 60) + '…' : msg.text;
        const toast = await this.toastCtrl.create({
            header: `New message from ${name}`,
            message: text,
            duration: 3000,
            position: 'top',
            buttons: [{ text: 'Open', handler: () => this.router.navigate(['/chat', msg.from]) }],
        });
        await toast.present();
    }
}