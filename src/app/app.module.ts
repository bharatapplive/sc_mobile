import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,

    IonicModule.forRoot({
      scrollAssist: false,
      scrollPadding: false
    }),

    AppRoutingModule
  ],

  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    )
  ],

  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}