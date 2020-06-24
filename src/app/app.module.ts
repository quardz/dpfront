import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { WpfcoreService } from './core/wpfcore.service';
import { WpnavComponent } from './core/components/wpnav/wpnav.component';
import { Page1Component } from './test/page1/page1.component';
import { Page2Component } from './test/page2/page2.component';
 
export function WpDBProvider(wpcore: WpfcoreService) {
  return () => wpcore.load();
}


@NgModule({
  declarations: [
    AppComponent,
    WpnavComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),

  ], 
  providers: [
    WpfcoreService,
    { provide: APP_INITIALIZER, useFactory: WpDBProvider, deps: [WpfcoreService], multi: true }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
