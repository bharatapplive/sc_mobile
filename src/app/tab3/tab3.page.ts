import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  user = signal(this.auth.currentUser);

  constructor(private auth: AuthService, private router: Router) { }

  ionViewWillEnter() {
    this.auth.refreshMe().subscribe((u) => this.user.set(u));
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}