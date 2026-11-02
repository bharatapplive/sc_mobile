import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectmessageinfoPageRoutingModule } from './directmessageinfo-routing.module';

import { DirectmessageinfoPage } from './directmessageinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectmessageinfoPageRoutingModule
  ],
  declarations: [DirectmessageinfoPage]
})
export class DirectmessageinfoPageModule {}
