import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [

  {
    path: '',
    component: TabsPage,

    children: [

      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(m => m.HomePageModule)
      },
       // PROFILE
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module')
            .then(m => m.ProfilePageModule)
      },
        
    {
  path: 'message',
  loadChildren: () =>
    import('../message/message.module').then(
      m => m.MessagePageModule
    )
},
 {
  path: 'search',
  loadChildren: () =>
    import('../search/search.module').then(
      m => m.SearchPageModule
    )
},
  {
    path:'reel',
    loadChildren: () =>
      import('../reel/reel.module').then(
        m => m.ReelPageModule
      )
    },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}