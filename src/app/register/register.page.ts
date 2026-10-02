import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  form = { firstName: '', lastName: '', userName: '', email: '', mobile: '', password: '', confirmPassword: '' };
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    const f = this.form;
    if (!f.firstName || !f.userName || !f.email || !f.mobile || !f.password) {
      this.error.set('Please fill in all required fields');
      return;
    }
    if (f.password !== f.confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    const { confirmPassword: _c, ...data } = f;

    this.auth.register(data).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.message;
        this.error.set(Array.isArray(msg) ? msg[0] : msg || 'Could not connect to server');
      },
    });
  }
}