import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
          path: 'feed',
          loadChildren: () =>
          import('../feed/feed.module').then(m => m.FeedPageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then(m => m.SearchPageModule),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('../add/add.module').then(m => m.AddPageModule),
      },
      {
        path: 'favourite',
        loadChildren: () =>
          import('../favourite/favourite.module').then(m => m.FavouritePageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(m => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}