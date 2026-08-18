import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'trending',
        loadChildren: () => import('../trending/trending.module').then(m => m.TrendingPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('../create/create.module').then(m => m.CreatePageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
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
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

