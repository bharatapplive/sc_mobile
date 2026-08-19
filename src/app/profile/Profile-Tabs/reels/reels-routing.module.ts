import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReelsPage } from './reels.page';

const routes: Routes = [
  {
    path: '',
    component: ReelsPage
  },  {
    path: 'reels',
    loadChildren: () => import('../../Profile-Tabs/reels/reels.module').then( m => m.ReelsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReelsPageRoutingModule {}
