import { NgModule } from '@angular/core';
import { FavouritePageRoutingModule } from './favourite-routing.module';
import { FavouritePage } from './favourite.page';

@NgModule({
  imports: [
    FavouritePageRoutingModule,
    FavouritePage,
  ],
})
export class FavouritePageModule {}