import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Naya add kiya hai
import { RegisterComponent } from './registration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // Yeh line app ko batayegi ki kaunsa page dikhana hai
    RouterModule.forChild([{ path: '', component: RegisterComponent }]) 
  ],
  declarations: [RegisterComponent]
})
export class RegistrationPageModule {}