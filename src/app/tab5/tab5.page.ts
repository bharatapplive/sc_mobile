import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterLink,
    BottomNavComponent,
    CommonModule
  ]
})
export class Tab5Page {

  isEditing = false;

  profileName = 'Deepanshu Rana';
  profileBio = 'Full Stack Developer';
  profileLocation = 'India';

  editProfile() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    this.isEditing = false;
    console.log('Profile saved');
  }

}