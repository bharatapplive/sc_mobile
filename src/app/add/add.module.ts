import { NgModule } from '@angular/core';
import { AddPageRoutingModule } from './add-routing.module';
import { AddPage } from './add.page';

@NgModule({
  imports: [
    AddPageRoutingModule,
    AddPage,
  ],
})
export class AddPageModule {}