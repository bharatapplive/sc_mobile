import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectmessagePage } from './directmessage.page';

const routes: Routes = [
  {
    path: '',
    component: DirectmessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectmessagePageRoutingModule {}
