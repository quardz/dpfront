import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WpfcoreService } from './core/wpfcore.service';
import { Page1Component } from './test/page1/page1.component';
import { Page2Component } from './test/page2/page2.component';

const routes: Routes = [
  { path: '', redirectTo: '/page1', pathMatch: 'full' },

  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


    // ** Global component which dispatch the 

    constructor() { 
      /*
      var pages: object;
      pages = [
        { path: 'page1', component: "Page1Component" },
        { path: 'page2', component: "Page2Component" },
      ];

      for(let page in pages) {
        var tmp = {
          path: pages[page].path,
          component: pages[page].component,
        }
        routes.push(tmp);
      }
      */
    }

    OnInit() {
      
    }    

}
