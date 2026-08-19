import { Component, Input } from '@angular/core';
import { IonToolbar, IonButtons, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonButtons, IonButton]
})
export class ProfileHeaderComponent {
  @Input() username: string = '';
}
