import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { isTokenValid } from './auth-utils';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isTokenValid()) {
    return true; // Token valid hai, /home route allow karo
  }

  // Token expired ya missing hai -> Login par bhej do
  router.navigate(['/login']);
  return false;
};

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isTokenValid()) {
    router.navigate(['/home']);
    return false; // Login page block karo
  }

  return true;
};

export const rootRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isTokenValid()) {
    router.navigate(['/home']);
  } else {
    router.navigate(['/login']);
  }

  return false;
};