import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaggedPage } from './tagged.page';

const routes: Routes = [
  {
    path: '',
    component: TaggedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaggedPageRoutingModule {}
