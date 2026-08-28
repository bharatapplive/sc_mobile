import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { rootRedirectGuard } from './guard/root-redirect.guard';
import { guestGuard } from './guard/guest.guard';
import { authGuard } from './guard/authGuard.guard';


const routes: Routes = [
  { path: '',
    canActivate: [rootRedirectGuard],
    children: [] // Triggers guard check on root launch
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [guestGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard]
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
