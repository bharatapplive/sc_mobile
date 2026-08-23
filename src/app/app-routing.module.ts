import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./message/message.page').then(m => m.MessagePage)
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  
  {
  path: 'home',
  loadComponent: () =>
    import('./home/home.page').then(m => m.HomePage)
},
{
  path: 'reel',
  loadComponent: () =>
    import('./reel/reel.page').then(m => m.ReelPage),
}
 
];
  
  

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
