import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConversationSearchComponent } from './components/conversation-search/conversation-search.component';

import { MessagePageRoutingModule } from './message-routing.module';

import { MessagePage } from './message.page';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePageRoutingModule,
    ConversationSearchComponent,
    ConversationListComponent,
    NotesListComponent,
    HeaderComponent
  ],
  declarations: [MessagePage]
})
export class MessagePageModule { }
