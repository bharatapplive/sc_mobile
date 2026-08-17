import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'', redirectTo:'feeds', pathMatch:"full"
      },
      {
        path: 'feeds',
        loadChildren: () => import('../feeds/feeds.module').then( m => m.FeedsPageModule)
      },
      {
        path: 'reels',
        loadChildren: () => import('../reels/reels.module').then( m => m.ReelsPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chatbox/chatbox.module').then( m => m.ChatboxPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search-box/search-box.module').then( m => m.SearchBoxPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
