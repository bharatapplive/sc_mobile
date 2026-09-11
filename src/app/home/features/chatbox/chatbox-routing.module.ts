import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatboxPage } from './chatbox.page';

const routes: Routes = [
  {
    path: '',
    component: ChatboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatboxPageRoutingModule {}
