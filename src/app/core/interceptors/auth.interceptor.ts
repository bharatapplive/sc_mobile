import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const token = auth.getToken();

    // token hai toh har request mein jod do
    const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;

    return next(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
            // token expire/galat → poora logout + login page (login/register API ko chhod ke)
            if (err.status === 401 && !req.url.includes('/auth/')) {
                auth.logout();
                router.navigateByUrl('/login', { replaceUrl: true });
            }
            return throwError(() => err);
        }),
    );
};