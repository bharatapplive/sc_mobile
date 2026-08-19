import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaggedPageRoutingModule } from './tagged-routing.module';

import { TaggedPage } from './tagged.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaggedPageRoutingModule
  ],
  declarations: [TaggedPage]
})
export class TaggedPageModule {}
