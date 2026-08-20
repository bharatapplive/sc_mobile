import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule,
    BottomNavComponent
  ]
})
export class Tab4Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
