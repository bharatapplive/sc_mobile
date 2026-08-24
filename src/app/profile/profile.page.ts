import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink]
})
export class ProfilePage {
  openChats(){
    this.router.navigate(['/tabs/chat'])
  }
  constructor(private router: Router) {}

}