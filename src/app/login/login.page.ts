import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  theme: 'light' | 'dark' = 'light';
  showPassword = false;

  constructor() {}

  ngOnInit() {
    this.setTheme('light');
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
  }

  login(event: Event) {
    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    event.preventDefault();
    window.location.reload();
  }
}