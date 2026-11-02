import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectmessagePage } from './directmessage.page';

const routes: Routes = [
  {
    path: '',
    component: DirectmessagePage
  },  {
    path: 'directmessageinfo',
    loadChildren: () => import('./directmessageinfo/directmessageinfo.module').then( m => m.DirectmessageinfoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectmessagePageRoutingModule {}
