import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Naya import form data ke liye
import { IonContent, IonItem, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { people, at, lockClosed, eye, eyeOff, logoGoogle, logoApple } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // FormsModule ko imports list mein daalna zaroori hai
  imports: [IonContent, IonItem, IonInput, IonIcon, IonButton, FormsModule], 
})
export class HomePage {
  passwordType: string = 'password';
  passwordIcon: string = 'eye';

  // In variables mein user ka type kiya hua data save hoga
  userEmail: string = '';
  userPassword: string = '';

  constructor() {
    addIcons({
      'people': people,
      'at': at,
      'lock-closed': lockClosed,
      'eye': eye,
      'eye-off': eyeOff,
      'logo-google': logoGoogle,
      'logo-apple': logoApple
    });
  }

  togglePassword() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-off';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye';
    }
  }

  // Jab Login button dabega toh yeh function chalega
  onLogin() {
    if (this.userEmail === '' || this.userPassword === '') {
      alert('Bhai, email aur password dono daalna zaroori hai! 😅');
    } else {
      // Yahan hum dekh rahe hain ki data successfully mil gaya hai
      console.log('Email:', this.userEmail);
      console.log('Password:', this.userPassword);
      alert('Login attempt successful!\nWelcome: ' + this.userEmail);
      
      // Future mein aap yahan Backend/Database ko data bhejne ka code likhenge
    }
  }
}