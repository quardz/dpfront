import { Component, OnInit } from '@angular/core';
import { Injectable, Injector } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { DynamicModule } from 'ng-dynamic-component';

import { WpfcoreService } from './core/wpfcore.service';
import { WpnavComponent } from './core/components/wpnav/wpnav.component';
import { WppageComponent } from './core/components/wppage/wppage.component';
import { WpwidgetsComponent, WpThemeSwitchComponent } from './core/components/wpwidgets/wpwidgets.component';
import { WpcategoryComponent } from './core/components/wpcategory/wpcategory.component';
import { WpsearchboxComponent } from './core/components/wpsearchbox/wpsearchbox.component';
import { TwentytwelveComponent } from './core/themes/twentytwelve/twentytwelve.component';
import { ThemeauthorComponent } from './core/themes/themeauthor/themeauthor.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/*
<theme-twentytwelve>
  
</theme-twentytwelve>
*/

export class AppComponent {
  title = 'Coin Blog';
  dbData: any;
  router: any;
  themename: string;
  wptheme: any;
  loading: boolean = true;
  themeMap: any = {};

  constructor(
      private wpcore: WpfcoreService, 
      private injector: Injector,
      private route: ActivatedRoute,
    ) {  


    //
    this.themeMap = {
      TwentytwelveComponent: TwentytwelveComponent, 
      ThemeauthorComponent: ThemeauthorComponent,
    };    
    
    this.dbData = wpcore.getData();
    if(this.dbData) {
      this.loading = false; 
    }
    var URLs: Array<any> = [];
    //Search page

    //change this based on conditions later
    this.wptheme = TwentytwelveComponent; //ThemeauthorComponent;//

    var allthemes = wpcore.getThemes();

    this.wpcore.currenttheme.subscribe((theme: any) => { 
      if(theme && this.themeMap[theme]) {
        this.wptheme = this.themeMap[theme]          
      }
      console.log("switching theme wiht subject", theme);
    });



    URLs = wpcore.getURLs(); 
    if(URLs) {
      this.router = this.injector.get(Router);
      //router.routeReuseStrategy.shouldReuseRoute = ( ) => false; 
      for(let _i in URLs) {
        this.router.config.push({ path: URLs[_i].url, component: WppageComponent }); 
      }
    }   

  }

  //Set the theme
  setTheme(theme: any = TwentytwelveComponent) {
    this.wptheme = theme;
    console.log("Switching theme");
  }


  OnInit() {


    this.router.routeReuseStrategy.shouldReuseRoute = function(){ 
      return false;
    };

    this.route.paramMap.subscribe(params => {
      this.themename = params.get('themename');
      console.log("current pages is ", this.themename);
    });

    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      console.log("testing params", params);
      // more stuff
    });
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0); 
              console.log("current evt is ", evt);
      }
    });    
  }
  
}
 
/*
SELECT p.* FROM wp1_posts AS p LEFT JOIN wp1_term_relationships AS tr ON tr.object_id = p.ID LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id WHERE p.post_type = 'nav_menu_item';


// Get all menu
SELECT * FROM wp1_terms AS t LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_id = t.term_id WHERE tt.taxonomy = 'nav_menu';


SELECT * FROM wp1_posts WHERE post_type = 'nav_menu_item';
*/
