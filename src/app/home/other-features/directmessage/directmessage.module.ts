import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectmessagePageRoutingModule } from './directmessage-routing.module';

import { DirectmessagePage } from './directmessage.page';
import { TimeAgoPipe } from 'src/app/core/time-ago-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectmessagePageRoutingModule,
    TimeAgoPipe
  ],
  declarations: [DirectmessagePage]
})
export class DirectmessagePageModule {}
