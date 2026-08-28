import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  // If user is already logged in, redirect them to home instead of login
  if (token) {
    router.navigate(['/home']);
    return false;
  }

  return true; // Allow access to login/register pages
};