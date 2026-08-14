import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuPage } from './side-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SideMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
