import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from '../components/tabs/tabs.component';
import { IonicModule} from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { RouterOutlet } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    TabsComponent,
    HeaderComponent,
    RouterOutlet
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
