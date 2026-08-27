import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [

  // ==============================
  // DEFAULT → LOGIN
  // ==============================
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ==============================
  // LOGIN
  // ==============================
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(
        m => m.LoginPageModule
      )
  },

  // ==============================
  // HOME
  // ==============================
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(
        m => m.HomePageModule
      )
  },

  // ==============================
  // EDIT PROFILE
  // IMPORTANT:
  // This MUST come before **
  // ==============================
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./edit-profile/edit-profile.module').then(
        m => m.EditProfilePageModule
      )
  },

  // ==============================
  // WILDCARD
  // MUST BE LAST
  // ==============================
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}