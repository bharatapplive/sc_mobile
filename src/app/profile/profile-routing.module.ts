import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },  {
    path: 'posts',
    loadChildren: () => import('./Profile-Tabs/posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'reels',
    loadChildren: () => import('./Profile-Tabs/reels/reels.module').then( m => m.ReelsPageModule)
  },
  {
    path: 'tagged',
    loadChildren: () => import('./Profile-Tabs/tagged/tagged.module').then( m => m.TaggedPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
