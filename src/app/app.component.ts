import { Component, OnInit } from '@angular/core';
import { WpfcoreService } from './core/wpfcore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dpfront';
  dbData: any;
  constructor(private wpcore: WpfcoreService) { 
    this.dbData = wpcore.getData();
    //wpcore.getUser(1).then((content)=>{
      console.log("Loading user 1", wpcore.getUser(1));
    //});
    
  }

  OnInit() {
    
  }
}
 
/*
SELECT p.* FROM wp1_posts AS p LEFT JOIN wp1_term_relationships AS tr ON tr.object_id = p.ID LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id WHERE p.post_type = 'nav_menu_item';


// Get all menu
SELECT * FROM wp1_terms AS t LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_id = t.term_id WHERE tt.taxonomy = 'nav_menu';


SELECT * FROM wp1_posts WHERE post_type = 'nav_menu_item';
*/