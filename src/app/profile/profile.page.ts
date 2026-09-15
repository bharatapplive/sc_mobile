import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  firstName = '';
  lastName = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const session = this.authService.getSession();
    const user = session?.user || {};

    this.firstName = user?.firstName || '';
    this.lastName = user?.lastName || '';
  }
}
