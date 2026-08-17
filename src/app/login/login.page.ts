import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  
})
export class LoginPage implements OnInit {
  theme: 'light' | 'dark' = 'light';

  constructor(private router: Router) { }

  ngOnInit() {
    this.setTheme('light');
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  login() {
    this.router.navigate(['/tabs/home']);
  }
}
