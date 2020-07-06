import { Component, OnInit } from '@angular/core';
import { WpfcoreService } from '../../wpfcore.service';
import { WpnavComponent } from '../../components/wpnav/wpnav.component';
import { WppageComponent } from '../../components/wppage/wppage.component';
import { WpcategoryComponent } from '../../components/wpcategory/wpcategory.component';
import { WparchivesComponent } from '../../components/wparchives/wparchives.component'; 

@Component({
  selector: 'app-themeauthor',
  templateUrl: './themeauthor.component.html',
  styleUrls: ['./themeauthor.component.scss']
})
export class ThemeauthorComponent implements OnInit {

dbData: any;
  loading: boolean = true;

  constructor(private wpcore: WpfcoreService) {  
    this.dbData = wpcore.getData();
    this.loading = wpcore.showSpinner;
  }

  
 
  ngOnInit(): void {


  }

  items = [
      {name: 'Home', link: '/home-page'}, 
      {name: 'Events', link: 'category/events'},

      {name: 'About', link: 'about-coin-blog'},
      {name: 'Careers', link: 'careers'},
      {name: 'Top 5', link: 'tag/bitcoin', children: [
        {name: 'Bitcoin', link: 'tag/bitcoin'},
        {name: 'Ethereum', link: 'tag/ethereum'},
        {name: 'DeFi', link: 'tag/defi'},
        {name: 'Tezos', link: 'tag/tezos'},
        {name: 'Cosmos', link: 'tag/cosmos'},
       ]
      },
      {name: 'Contact', link: 'contact'},
      {name: 'Goto Google', link: 'https://google.com', ext: true}, 
  ];  
}