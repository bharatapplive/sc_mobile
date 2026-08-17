import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavouritePage } from './favourite.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouritePageRoutingModule {}