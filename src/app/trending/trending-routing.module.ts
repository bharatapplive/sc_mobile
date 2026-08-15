import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrendingPage } from './trending.page';

const routes: Routes = [
  {
    path: '',
    component: TrendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendingPageRoutingModule {}
