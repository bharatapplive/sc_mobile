import { NgModule } from '@angular/core';
import { SearchPageRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';

@NgModule({
  imports: [
    SearchPageRoutingModule,
    SearchPage,
  ],
})
export class SearchPageModule {}