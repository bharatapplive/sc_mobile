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
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  // PROFILE IS OUTSIDE TABS
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfilePageModule)
  },

  {
    path: '**',
    redirectTo: 'login'
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