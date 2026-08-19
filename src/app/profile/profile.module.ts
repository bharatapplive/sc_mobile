import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { ProfileTabsComponent } from './components/profile-tabs/profile-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HeaderComponent,
    ProfileInfoComponent,
    ProfileHeaderComponent,
    HighlightsComponent,
    ProfileTabsComponent
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
