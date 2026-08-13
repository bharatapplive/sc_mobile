import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
