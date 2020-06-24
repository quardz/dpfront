import { Component, OnInit } from '@angular/core';
import { WpfcoreService } from './core/wpfcore.service';
import { WpnavComponent } from './core/components/wpnav/wpnav.component';

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

    var filters: Array<any>  = ["ID", "=", 9];
    wpcore.loadEntity('posts', filters).then((rows)=>{ 
      //console.log("loaded entity", rows);  
    }); 
    
    wpcore.getRecentPosts().then((rows)=>{
      //console.log("recent posts", rows);  
    });
    
    wpcore.getPost(1).then((post:any)=>{
      var d = new Date(post.post_date);
      //console.log("get a posts", d, post.post_date);   
    });

     
     
    
  }

  ulclass = "thisistop";

  items = [
    {name: 'rroott',link: 'page1', children: [
      {name: 'a', link: 'page1', children: []}, 
      {name: 'b', link: 'page2', children: []},
      {name: 'c', link: 'page1', children: [
        {name: 'd', link: 'page2', children: []},
        {name: 'e', link: 'page1', children: []},
        {name: 'f', link: 'page2', children: []},
       ]},
      ]
    }
  ];  


  OnInit() {
    
  }
}
 
/*
SELECT p.* FROM wp1_posts AS p LEFT JOIN wp1_term_relationships AS tr ON tr.object_id = p.ID LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_taxonomy_id = tr.term_taxonomy_id WHERE p.post_type = 'nav_menu_item';


// Get all menu
SELECT * FROM wp1_terms AS t LEFT JOIN wp1_term_taxonomy AS tt ON tt.term_id = t.term_id WHERE tt.taxonomy = 'nav_menu';


SELECT * FROM wp1_posts WHERE post_type = 'nav_menu_item';
*/