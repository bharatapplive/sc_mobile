import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone:true,
  imports:[IonicModule,
    BottomNavComponent
  ]
})
export class Tab2Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
