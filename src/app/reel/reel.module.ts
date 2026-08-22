import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReelPageRoutingModule } from './reel-routing.module';

import { ReelPage } from './reel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReelPageRoutingModule
  ],
  declarations: [ReelPage]
})
export class ReelPageModule {}
