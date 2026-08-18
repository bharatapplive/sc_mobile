import { Component } from '@angular/core';
import { IonToolbar, IonButtons, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ IonToolbar, IonButtons, IonButton, RouterLink],
})
export class HeaderComponent {

  cameraBtnHandler() {
    console.log("Camera button clicked!");
  }

  notificationBtnHandler() {
    console.log("Notification button clicked!");
  }

}
