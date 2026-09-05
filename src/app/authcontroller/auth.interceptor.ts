import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent, 
  HttpErrorResponse 
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth-service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertController: AlertController,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const endpoints = ['/auth/login', '/auth/register', '/auth/verify-otp'];
    const isExcluded = endpoints.some(url => req.url.includes(url));

    let token = this.authService.getToken();
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1'); // Strips potential quotes safely
    }

    let authReq = req;

    // Attach Bearer token to all non-excluded endpoints
    if (token && !isExcluded) {
      authReq = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Single pipeline for ALL requests
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.showSessionExpiredAlert();
        }
        return throwError(() => error);
      })
    );
  }

  async showSessionExpiredAlert() {
    // Clear saved storage data
    localStorage.clear();

    const alert = await this.alertController.create({
      header: 'Session Expired',
      message: 'Please login again!',
      buttons: [
        {
          text: 'Login',
          handler: () => {
            this.authService.logout();
          }
        }
      ],
      backdropDismiss: false // Alert ko miss/dismiss hone se rokne ke liye
    });

    await alert.present();
  }
}