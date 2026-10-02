import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  identifier = '';
  password = '';
  showPassword = false;
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    if (!this.identifier.trim() || !this.password) {
      this.error.set('Please fill in all fields');
      return;
    }
    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.identifier, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Could not connect to server');
      },
    });
  }
}