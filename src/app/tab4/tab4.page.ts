import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    BottomNavComponent
  ]
})
export class Tab4Page implements OnInit {

  searchText = '';

  constructor() {}

  ngOnInit() {}

  showMessage(name: string): boolean {
    return name
      .toLowerCase()
      .includes(this.searchText.toLowerCase());
  }

  openChat(name: string) {
    alert(`Opening chat with ${name}`);
  }
}
