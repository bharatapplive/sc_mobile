import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // Default page
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },

  // Registration
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },

  // Feed
  {
    path: 'feed',
    loadChildren: () =>
      import('./feed/feed.module').then(m => m.FeedPageModule)
  },

  // Profile
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfilePageModule)
  },

  // Direct Message
  {
    path: 'direct-msg',
    loadChildren: () =>
      import('./direct-msg/direct-msg.module').then(m => m.DirectMsgPageModule)
  },

  // Home
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
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