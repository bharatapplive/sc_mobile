import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'home',
        children:[
          {
            path: 'home',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path:'trending',
        children:[
          {
            path:'',
            loadChildren: () => import('../trending/trending.module').then(m => m.TrendingPageModule)
          }
        ]
      },
      {
        path:'create',
        children:[
          {
            path:'',
            loadChildren: () => import('../create/create.module').then(m => m.CreatePageModule)
          }
        ]
      },
      {
        path:'message',
        children:[
          {
            path:'',
            loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
          }
        ]
      },
      {
        path:'profile',
        children:[
          {
            path:'',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
