import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        loadChildren: () =>
          import('../feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'add',
        loadChildren: () =>
          import('../add/add.module').then(m => m.AddPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('../notifications/notifications.module').then(
            m => m.NotificationsPageModule
          )
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(
            m => m.ProfilePageModule
          )
      },

      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}