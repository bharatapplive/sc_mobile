import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const rootRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  if (token) {
    router.navigate(['/home']);
  } else {
    router.navigate(['/login']);
  }

  return false;
};