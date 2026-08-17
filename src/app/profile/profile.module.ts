import { NgModule } from '@angular/core';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    ProfilePageRoutingModule,
    ProfilePage,
  ],
})
export class ProfilePageModule {}