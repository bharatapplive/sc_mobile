import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectMsgPage } from './direct-msg.page';

const routes: Routes = [
  {
    path: '',
    component: DirectMsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectMsgPageRoutingModule {}
