import { Component, OnInit } from '@angular/core';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { WpfcoreService } from './core/wpfcore.service';
import { WpnavComponent } from './core/components/wpnav/wpnav.component';
import { WppageComponent } from './core/components/wppage/wppage.component';
import { WpcategoryComponent } from './core/components/wpcategory/wpcategory.component';
import { WpsearchboxComponent } from './core/components/wpsearchbox/wpsearchbox.component';
import { TwentytwelveComponent } from './core/themes/twentytwelve/twentytwelve.component';
import { Page2Component } from './test/page2/page2.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Coin Blog';
  dbData: any;
  constructor(
      private wpcore: WpfcoreService,
      private injector: Injector,

    ) {  
    
    this.dbData = wpcore.getData();
    var URLs: Array<any> = [];
    //Search page
    

    URLs = wpcore.getURLs();
    if(URLs) {
      const router = this.injector.get(Router);
      //router.routeReuseStrategy.shouldReuseRoute = ( ) => false; 
      for(let _i in URLs) {
        router.config.push({ path: URLs[_i].url, component: WppageComponent }); 
      }
    }

    
    
  }

  
}
 
/*
SELECT p.* FROM wp1_posts AS p LEFT JOIN wp1_term_relationships AS tr ON tr.object_id = p.ID LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id WHERE p.post_type = 'nav_menu_item';


// Get all menu
SELECT * FROM wp1_terms AS t LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_id = t.term_id WHERE tt.taxonomy = 'nav_menu';


SELECT * FROM wp1_posts WHERE post_type = 'nav_menu_item';
*/
