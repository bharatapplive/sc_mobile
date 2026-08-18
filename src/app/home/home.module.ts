import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { StoryListComponent } from './components/story-list/story-list.component';
import { HeaderComponent } from '../components/header/header.component';
import { FeedComponent } from './components/feed/feed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StoryListComponent,
    HeaderComponent,
    FeedComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
