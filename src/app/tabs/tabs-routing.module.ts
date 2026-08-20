import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.page').then(m => m.HomePage)
  },

  {
    path: 'feed',
    loadComponent: () =>
      import('../feed/feed.page').then(m => m.FeedPage)
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('../profile/profile.page').then(m => m.ProfilePage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
