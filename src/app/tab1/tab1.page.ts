import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone:true,
  imports: [IonicModule,
    BottomNavComponent
  ]
})
export class Tab1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
