import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
  standalone:false
})
export class FeedsPage implements OnInit {

  // example.component.ts
  defaultAvatar = 'assets/images/default-avatar.png';

  constructor() { }

  ngOnInit() {
  }

}
