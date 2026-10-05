import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { DirectMessage, DirectMessagePayload } from 'src/app/core/authcontroller/authInterface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket!: Socket;
  private messageSubject = new Subject<DirectMessagePayload>();

  constructor(
    private http: HttpClient
  ){}

  connectSocket(jwtToken: string): void {
    if (!this.socket) {
      this.socket = io(environment.apiUrl, {
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

  // --- WebSocket Actions ---

  joinRoom(roomId: string, userId: string){
    if (this.socket && roomId) {
      this.socket.emit('joinRoom', { roomId, userId });
    }
  }

  // Emit chat message to NestJS server
  sendMessage(payload: DirectMessagePayload){
    if (this.socket) {
      this.socket.emit('sendPrivateMessage', payload);
    }
  }

  // Listen for incoming messages from server
  getMessages(): Observable<DirectMessagePayload> {
    return this.messageSubject.asObservable();
  }

  // --- HTTP REST APIs (from Controller) ---

  getRoomHistory(roomId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/direct-message/room/${roomId}`);
  }

  markMessagesAsRead(roomId: string, userId: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/direct-message/rooms/${roomId}/read`, { userId });
  }
  
  getAllRooms(){
    return this.http.get<any>(`${environment.apiUrl}/direct-message/rooms`);
  }

  deleteMsg(roomId: string): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/direct-message/rooms/${roomId}`);
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}