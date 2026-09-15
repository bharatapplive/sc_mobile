import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
   // step 3  it will check if the user is logged in or not by checking the token in local storage. If the token is not present, it will redirect to the login page and return false. If the token is present, it will return true and allow access to the route.
   // THE PROOF is token in this case is jwt_token which is stored in local storage when the user logs in successfully. If the token is not present, it means the user is not logged in and will be redirected to the login page. 
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
