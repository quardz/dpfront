import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { WpfcoreService } from './core/wpfcore.service';

export function WpDBProvider(wpcore: WpfcoreService) {
  return () => wpcore.load();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ], 
  providers: [
    WpfcoreService,
    { provide: APP_INITIALIZER, useFactory: WpDBProvider, deps: [WpfcoreService], multi: true }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
