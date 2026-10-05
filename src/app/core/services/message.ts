import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { io, Socket } from 'socket.io-client';

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

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly messageUrl = 'http://localhost:3000/direct-message';
  
  private socket!: Socket;
  private messageSubject = new Subject<DirectMessagePayload>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  connectSocket(jwtToken: string): void {
    if (!this.socket) {
      this.socket = io('http://localhost:3000/direct-message', {
        auth: { token: jwtToken },
        autoConnect: true,
        transports: ['websocket'],
      });

      // FIXED: Listens for 'newMessage' emitted by DirectMessageGateway
      this.socket.on('newMessage', (message: DirectMessagePayload) => {
        this.messageSubject.next(message);
      });

      this.socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
      });
    } else if (!this.socket.connected) {
      this.socket.auth = { token: jwtToken };
      this.socket.connect();
    }
  }
  
  // mobile will have vinay shankar's mobile number and then we will send it to backend to get all users with whom vinay shankar has chat history
  getUsers(mobile: string): Observable<any[]> {
    if (!this.authService.getSession().isAuthenticated) {
      return of([]);
    }
    // we are calling backend api to get all users
    return this.http.post<any[]>('http://localhost:3000/auth/users', {
      mobile,
    });
  }

  // Emit chat message to NestJS server
  sendMessage(payload: DirectMessagePayload){
    if (this.socket) {
      this.socket.emit('sendPrivateMessage', payload);
    }
  }

  recivedMessages(): Observable<DirectMessagePayload> {
    return this.messageSubject.asObservable();
  }

  getMessages(): Observable<any[]> {
    if (!this.authService.getSession().isAuthenticated) {
      return of([]);
    }

    return this.http.get<any[]>(this.messageUrl);
  }
}
