import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TrendingPageRoutingModule } from './trending-routing.module';

import { TrendingPage } from './trending.page';
import { HeaderComponent } from '../components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CategoryChipsComponent } from './components/category-chips/category-chips.component';
import { TrendingGridComponent } from './components/trending-grid/trending-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrendingPageRoutingModule,
    HeaderComponent,
    SearchBarComponent,
    CategoryChipsComponent,
    TrendingGridComponent 
  ],
  declarations: [TrendingPage]
})
export class TrendingPageModule { }
