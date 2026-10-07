import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteServe {
  private previousUrl: string | null = null;
  private currentUrl: string = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const nextUrl = event.urlAfterRedirects || event.url;
        if (this.isValidPreviousUrl(this.currentUrl)) {
          this.previousUrl = this.currentUrl;
        }
        this.currentUrl = nextUrl;
      });
  }

  private isValidPreviousUrl(url: string): boolean {
    if (!url) return false;
    const clean = url.trim();
    if (clean === '' || clean === '/' || clean === '/home') return false;
    if (clean.includes('/post')) return false;
    if (clean.includes('/login') || clean.includes('/registration') || clean.includes('/setup-profile')) return false;
    return true;
  }

  public getPreviousUrl(): string {
    if (this.previousUrl && this.isValidPreviousUrl(this.previousUrl)) {
      return this.previousUrl;
    }
    return '/home/feeds';
  }
}
