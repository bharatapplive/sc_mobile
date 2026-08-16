import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'feeds',
    loadChildren: () => import('./feeds/feeds.module').then( m => m.FeedsPageModule)
  },
  {
    path: 'reels',
    loadChildren: () => import('./reels/reels.module').then( m => m.ReelsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chatbox/chatbox.module').then( m => m.ChatboxPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search-box/search-box.module').then( m => m.SearchBoxPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
