import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class BottomNavComponent {

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }

}
