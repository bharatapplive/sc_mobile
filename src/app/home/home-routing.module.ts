import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
      {
        path: 'feed',
        loadChildren: () =>
          import('../feed/feed.module').then((m) => m.FeedPageModule),
      },
      {
        path: 'story',
        loadChildren: () =>
          import('../story/story.module').then((m) => m.StoryPageModule),
      },
      // step 1: create route name -> message
      {
        path: 'message',
        loadChildren: () =>
          // step 3:- create message module and page
          import('../message/message.module').then((m) => m.MessagePageModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      }

      // notofication route
      // setting route
      // search route
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
