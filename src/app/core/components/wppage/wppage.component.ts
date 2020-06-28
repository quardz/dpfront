import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Location } from '@angular/common';
import { WpfcoreService } from '../../wpfcore.service';


@Component({
  selector: 'app-wppage',
  templateUrl: './wppage.component.html',
  styleUrls: ['./wppage.component.scss']
})
export class WppageComponent implements OnInit {

  entity_type: string;
  entity_id: number;
  post: any;

  constructor(private wpcore: WpfcoreService) { 
    
    var currentPage: any;
    currentPage = wpcore.getCurrentpageEntity();
    console.log("getCurrentpageEntity", currentPage);
    if(currentPage) {
      this.entity_id = currentPage.id;
      wpcore.getPost(this.entity_id).then((post)=>{ 
        this.post = post;
        console.log("current ENtity", post);  
      })
    }    

  }

  ngOnInit(): void {
  } 

}
