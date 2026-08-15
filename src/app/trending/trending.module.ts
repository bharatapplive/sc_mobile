import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from '../components/tabs/tabs.component';
import { IonicModule } from '@ionic/angular';

import { TrendingPageRoutingModule } from './trending-routing.module';

import { TrendingPage } from './trending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrendingPageRoutingModule,
    TabsComponent
  ],
  declarations: [TrendingPage]
})
export class TrendingPageModule { }
