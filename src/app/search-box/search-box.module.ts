import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchBoxPageRoutingModule } from './search-box-routing.module';

import { SearchBoxPage } from './search-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBoxPageRoutingModule
  ],
  declarations: [SearchBoxPage]
})
export class SearchBoxPageModule {}
