import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },

 {
  path: 'register',
  loadChildren: () =>
    import('./register/register.module').then(
      m => m.RegisterPageModule
    )
},
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'feed',
    loadChildren: () =>
      import('./feed/feed.module').then(m => m.FeedPageModule)
  },

  {
    path: 'reels',
    loadChildren: () =>
      import('./reels/reels.module').then(m => m.ReelsPageModule)
  },

  {
    path: 'add',
    loadChildren: () =>
      import('./add/add.module').then(m => m.AddPageModule)
  },

  {
    path: 'chatbox',
    loadChildren: () =>
      import('./chatbox/chatbox.module').then(m => m.ChatboxPageModule)
  },

  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
  },

  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchPageModule)
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}