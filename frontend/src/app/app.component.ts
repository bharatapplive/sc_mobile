import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { filter } from 'rxjs';

interface UserProfile {
  avatarUrl?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  // user: UserProfile | null = null;
  
  // private readonly API_URL = 'http://localhost:3000';

  // activeTab: string = 'feeds';
  // showTabs = true;
  // hiddenTabRoutes: string[] = ['/login', 'register', '/upload-avatar'];
  // private readonly TAB_SHOW_DELAY = 500; 
  // private tabTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {    
  }

  
}
