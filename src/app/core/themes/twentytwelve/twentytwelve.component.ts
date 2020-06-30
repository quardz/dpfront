import { Component, OnInit } from '@angular/core';
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
      {name: 'Home', link: '/home-page'}, 
      {name: 'Events', link: 'category/events'},

      {name: 'About', link: 'about-coin-blog'},
      {name: 'Careers', link: 'careers'},
      {name: 'Top 5', link: 'post_tag/bitcoin', children: [
        {name: 'Bitcoin', link: 'post_tag/bitcoin'},
        {name: 'Ethereum', link: 'post_tag/ethereum'},
        {name: 'DeFi', link: 'post_tag/defi'},
        {name: 'Tezos', link: 'post_tag/tezos'},
        {name: 'Cosmos', link: 'post_tag/cosmos'},
       ]
      },
      {name: 'Contact', link: 'contact'},
      {name: 'Goto Google', link: 'https://google.com', ext: true},
  ];  

}
