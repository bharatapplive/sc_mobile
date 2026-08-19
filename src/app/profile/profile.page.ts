import { Component, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage{
  constructor() { }
  onTabChange(change: any) {
    console.log(change)
  }
}
