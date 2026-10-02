import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// sirf logged-in users andar jaa sakte hain
export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};

// logged-in user ko login/register dobara na dikhe
export const guestGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    return auth.isLoggedIn() ? inject(Router).createUrlTree(['/tabs/tab1']) : true;
};