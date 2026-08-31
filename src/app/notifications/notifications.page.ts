
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: false,
})
export class NotificationsPage {

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  // Back button
  goBack() {
    this.router.navigate(['/home']);
  }

  // Three-dot menu
  async showOptions() {
    const alert = await this.alertController.create({
      header: 'Notifications',
      buttons: [
        {
          text: 'Mark all as read',
          handler: () => {
            console.log('All notifications marked as read');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  // Follow button
  async followUser() {
    const alert = await this.alertController.create({
      header: 'Following',
      message: 'You are now following pixel_art.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Confirm friend request
  async confirmRequest() {
    const alert = await this.alertController.create({
      header: 'Friend Request',
      message: 'Friend request accepted.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Delete friend request
  async deleteRequest() {
    const alert = await this.alertController.create({
      header: 'Friend Request',
      message: 'Friend request deleted.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Bottom navigation
  openPage(page: string) {

    switch (page) {

      case 'home':
        this.router.navigate(['/home']);
        break;

      case 'search':
        this.router.navigate(['/search']);
        break;

      case 'add':
        this.router.navigate(['/add']);
        break;

      case 'profile':
        this.router.navigate(['/profile']);
        break;

    }
  }
}



