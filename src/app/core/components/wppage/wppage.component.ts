import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Location } from '@angular/common';
import { WpfcoreService } from '../../wpfcore.service';
import { WppostComponent } from '../wppost/wppost.component'

@Component({
  selector: 'app-wppage',
  templateUrl: './wppage.component.html',
  styleUrls: ['./wppage.component.scss']
})
export class WppageComponent implements OnInit { 

  entity_type: string;
  entity_id: number;
  content: any;
  currentPage: any;
  mapIndex_Pk: Array<any> = [];
  entity: any;

  constructor(private wpcore: WpfcoreService) { 

    
    console.log("Map PK", wpcore.getMapIndex_Pk());
 
    this.currentPage = wpcore.getCurrentpageEntity();
    console.log("getCurrentpageEntity", this.currentPage);

    this.mapIndex_Pk = wpcore.getMapIndex_Pk();

    if(this.currentPage) {
      this.entity_id = this.currentPage.id;
      this.entity_type = this.currentPage.entity;
      //Load Post page
      if(this.entity_type == 'posts') {
        this.content = wpcore.getPost(this.entity_id);
        console.log("current post", this.content);  
      }
      //Load term page
      if(this.entity_type == 'terms') {
        this.content = wpcore.getTerm(this.entity_id);
        console.log("current term", this.content);  
      }

    }    

  }

  ngOnInit(): void {
  } 

}
