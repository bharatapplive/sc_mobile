import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'feeds',
        pathMatch: 'full'
      },
      {
        path: 'feeds',
        loadChildren: () => import('../tabs/feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'post',
        loadChildren: () => import('../tabs/post/post.module').then(m => m.PostPageModule)
      },
      {
        path: 'favourite',
        loadChildren: () => import('../tabs/favourite/favourite.module').then(m => m.FavouritePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../tabs/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../tabs/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../tabs/chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'reels',
        loadChildren: () => import('../tabs/reels/reels.module').then(m => m.ReelsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }