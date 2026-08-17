import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: false
})
export class RegistrationPage implements OnInit {

  theme: 'light' | 'dark' = 'light';

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
}