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
        loadChildren: () => import('./features/feeds/feeds.module').then( m => m.FeedsPageModule)
      },
      {
        path: 'reels',
        loadChildren: () => import('./features/reels/reels.module').then( m => m.ReelsPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./features/chatbox/chatbox.module').then( m => m.ChatboxPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./features/search-box/search-box.module').then( m => m.SearchBoxPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'post',
        loadChildren: () => import('./features/post/post.module').then( m => m.PostPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
