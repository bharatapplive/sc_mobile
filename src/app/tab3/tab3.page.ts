import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../core/services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  user = signal<User | null>(this.auth.currentUser);

  // photo ka poora URL, ya khaali agar photo nahi hai
  photoUrl = computed(() => {
    const img = this.user()?.image;
    return img ? `${environment.apiUrl}${img}` : '';
  });

  // photo na ho toh naam ke pehle letters (jaise "TU")
  initials = computed(() => {
    const u = this.user();
    return ((u?.firstName?.[0] ?? '') + (u?.lastName?.[0] ?? '')).toUpperCase();
  });

  editing = signal(false);
  saving = signal(false);
  uploading = signal(false);
  error = signal('');
  form = { firstName: '', lastName: '', userName: '', bio: '' };

  constructor(private auth: AuthService, private router: Router) { }

  ionViewWillEnter() {
    this.auth.refreshMe().subscribe((u) => this.user.set(u));
  }

  startEdit() {
    const u = this.user();
    this.form = {
      firstName: u?.firstName ?? '',
      lastName: u?.lastName ?? '',
      userName: u?.userName ?? '',
      bio: u?.bio ?? '',
    };
    this.error.set('');
    this.editing.set(true);
  }

  cancelEdit() {
    this.editing.set(false);
    this.error.set('');
  }

  save() {
    if (!this.form.firstName.trim() || !this.form.userName.trim()) {
      this.error.set('First name and username are required');
      return;
    }
    this.saving.set(true);
    this.error.set('');
    this.auth.updateProfile(this.form).subscribe({
      next: (u) => {
        this.user.set(u);
        this.saving.set(false);
        this.editing.set(false);
      },
      error: (err) => {
        this.saving.set(false);
        const msg = err?.error?.message;
        this.error.set(Array.isArray(msg) ? msg[0] : msg || 'Could not save');
      },
    });
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ''; // same photo dobara chun sako
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      this.error.set('Image must be under 5 MB');
      return;
    }
    this.uploading.set(true);
    this.error.set('');
    this.auth.uploadPhoto(file).subscribe({
      next: (u) => {
        this.user.set(u);
        this.uploading.set(false);
      },
      error: (err) => {
        this.uploading.set(false);
        this.error.set(err?.error?.message || 'Upload failed');
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}