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
  issearchpage: boolean = false;
  searchkey: string;
  paramSub: any;
  archives: any;

  constructor(private wpcore: WpfcoreService, private route: ActivatedRoute, private router: Router ,location: Location) { 

    this.mapIndex_Pk = wpcore.getMapIndex_Pk();
 
    this.currentPage = wpcore.getCurrentpageEntity();

    //For archives pages and search 
    if(!this.currentPage) {
      const key: string = this.route.snapshot.params.key;
      if(this.router.url === ('/search/' + key)) {
        this.issearchpage = true;
        this.entity_type = 'search';
        this.searchkey = key;
        this.content = wpcore.searchPosts(key);
      }

      const year: string = this.route.snapshot.params.year;
      const month: string = this.route.snapshot.params.month;
      const _period = year + '/' + month;;
      const _cur_url = '/date/' + _period;
      if(this.router.url === _cur_url) {
        this.entity_type = 'archives';
        var _periods = wpcore.getArchives();
        if(_periods) {
          this.content = _periods[_period];
          this.searchkey = _period;
        }
      }
    }

    

    
    //For terms and post pages
    if(this.currentPage) {
      console.log("current page is entity page");
      this.entity_id = this.currentPage.id;
      this.entity_type = this.currentPage.entity;
      //Load Post page
      if(this.entity_type == 'posts') {
        this.content = wpcore.getPost(this.entity_id);
      }
      //Load term page
      if(this.entity_type == 'terms') {
        this.content = wpcore.getTerm(this.entity_id);
      }
    }    

    //for Search pages


  }
  ngOnInit(): void {
    //this.paramSub = this.route.params.subscribe((params) => {
    //  console.log("in wppage oninit", params);
    //});
  }
 
  ngOnDestroy(){
    //console.log('ngOnDestroy');
    //this.paramSub.unsubscribe();
  }


}
