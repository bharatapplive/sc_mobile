import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { RegisterPage } from './registration.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegisterPage]
})
export class RegistrationPageModule { }
