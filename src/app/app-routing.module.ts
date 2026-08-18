import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./features/auth/registration/registration.module').then(m => m.RegistrationPageModule)
  },  {
    path: 'search',
    loadChildren: () => import('./features/tabs/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./features/tabs/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./features/tabs/favourite/favourite.module').then( m => m.FavouritePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
