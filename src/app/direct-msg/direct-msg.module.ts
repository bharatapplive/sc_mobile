import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectMsgPageRoutingModule } from './direct-msg-routing.module';

import { DirectMsgPage } from './direct-msg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectMsgPageRoutingModule
  ],
  declarations: [DirectMsgPage]
})
export class DirectMsgPageModule {}
