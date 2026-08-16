import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBoxPage } from './search-box.page';

const routes: Routes = [
  {
    path: '',
    component: SearchBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBoxPageRoutingModule {}
