import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReelPage } from './reel.page';

const routes: Routes = [
  {
    path: '',
    component: ReelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReelPageRoutingModule {}
