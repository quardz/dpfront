import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WpfcoreService } from '../../wpfcore.service';
import { WpnavComponent } from '../../components/wpnav/wpnav.component';
import { WppageComponent } from '../../components/wppage/wppage.component';
import { WpcategoryComponent } from '../../components/wpcategory/wpcategory.component';

@Component({
  selector: 'theme-twentytwelve',
  templateUrl: './twentytwelve.component.html',
  styleUrls: ['./twentytwelve.component.scss']
})
export class TwentytwelveComponent implements OnInit {

  dbData: any;

  constructor(private wpcore: WpfcoreService) { 
    this.dbData = wpcore.getData();

  }

  

  ngOnInit(): void {
  }

  items = [
      {name: 'Home', link: 'page1'}, 
      {name: 'Services', link: 'page2'},
      {name: 'Products', link: 'page1', children: [
        {name: 'Mail service', link: 'page2'},
        {name: 'Hosting', link: 'page1'},
        {name: 'Video processing', link: 'page2'},
       ]
      },
      {name: 'About us', link: 'page2'},
      {name: 'Contact', link: 'page2'},
  ];  

}
