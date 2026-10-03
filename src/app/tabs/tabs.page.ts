import { Component } from '@angular/core';
import { SocketService } from '../core/services/socket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  constructor(public socket: SocketService) { }
}