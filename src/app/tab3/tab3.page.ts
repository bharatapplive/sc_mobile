import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone:true,
  imports: [IonicModule,
    BottomNavComponent
  ]
})
export class Tab3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
