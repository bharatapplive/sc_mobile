import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileInfoComponent {
  profile!: Profile;
  constructor(private profileService: ProfileService) {}
  ngOnInit() {
    this.profile = this.profileService.getProfile()
  }
}
