// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { TabsPage } from './tabs.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: TabsPage,
//     children: [

//       {
//         path: 'home',
//         loadChildren: () =>
//           import('../home/home.module').then(m => m.HomePageModule)
//       },

//       {
//         path: 'feed',
//         loadChildren: () =>
//           import('../feed/feed.module').then(m => m.FeedPageModule)
//       },

//       {
//         path: 'direct-msg',
//         loadChildren: () =>
//           import('../direct-msg/direct-msg.module').then(m => m.DirectMsgPageModule)
//       },

//       {
//         path: 'profile',
//         loadChildren: () =>
//           import('../profile/profile.module').then(m => m.ProfilePageModule)
//       },

//       {
//         path: '',
//         redirectTo: 'home',
//         pathMatch: 'full'
//       }

//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class TabsPageRoutingModule {}