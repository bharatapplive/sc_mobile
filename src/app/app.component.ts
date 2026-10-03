import { Component } from '@angular/core';
import { SocketService } from './core/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // sirf inject karna kaafi hai, isse socket service start ho jaati hai
  constructor(private socket: SocketService) { }
}