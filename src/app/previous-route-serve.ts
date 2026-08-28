import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouteServe {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  constructor(
    private router: Router
  ){
    this.initNavigationTracker();
  }

  initNavigationTracker(): void {
    
    this.router.events.pipe(filter((e): e is RoutesRecognized => e instanceof RoutesRecognized),pairwise()).subscribe(
      (events: [RoutesRecognized, RoutesRecognized]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects
      }
    );
  }

  getPreviousUrl(): string | null{
    return this.previousUrl;
  }
  
  getCurrentUrl(): string | null{
    return this.currentUrl;
  }
}
