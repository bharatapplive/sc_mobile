import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadPage } from './load.page';

const routes: Routes = [
  {
    path: '',
    component: LoadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadPageRoutingModule {}
