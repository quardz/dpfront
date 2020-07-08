import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';



import { WpfcoreService } from './core/wpfcore.service';
import { WpnavComponent } from './core/components/wpnav/wpnav.component';
import { WppageComponent } from './core/components/wppage/wppage.component';
import { WpcategoryComponent } from './core/components/wpcategory/wpcategory.component';
import { TwentytwelveComponent } from './core/themes/twentytwelve/twentytwelve.component';
import { WppostComponent } from './core/components/wppost/wppost.component';
import { WpsearchboxComponent } from './core/components/wpsearchbox/wpsearchbox.component';
import { Excerpt } from './core/excerpt.filter.pipe';
import { WparchivesComponent } from './core/components/wparchives/wparchives.component';
import { ThemeauthorComponent } from './core/themes/themeauthor/themeauthor.component';
import { WpwidgetsComponent, WpThemeSwitchComponent } from './core/components/wpwidgets/wpwidgets.component';
import { WpoutletComponent } from './core/components/wpoutlet/wpoutlet.component';
 
export function WpDBProvider(wpcore: WpfcoreService) {
  return () => wpcore.load();
}


@NgModule({
  declarations: [
    AppComponent,
    WpnavComponent,
    WppageComponent,
    WpcategoryComponent,
    TwentytwelveComponent,
    WppostComponent,
    WpsearchboxComponent,
    Excerpt,
    WparchivesComponent,
    ThemeauthorComponent,
    WpwidgetsComponent,
    WpThemeSwitchComponent,
    WpoutletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    DynamicModule,

  ], 
  providers: [
    WpfcoreService,
    { provide: APP_INITIALIZER, useFactory: WpDBProvider, deps: [WpfcoreService], multi: true }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
