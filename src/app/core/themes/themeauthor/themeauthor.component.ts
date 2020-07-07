import { Component, OnInit, HostListener } from '@angular/core';
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

@HostListener('window:resize', ['$event'])


export class ThemeauthorComponent implements OnInit {

  dbData: any;
  loading: boolean = true;
  public innerHeight: any = 500;


  constructor(private wpcore: WpfcoreService) {  
    this.dbData = wpcore.getData();
    this.loading = wpcore.showSpinner;
  }

  onResize(event) {
    this.innerHeight = window.innerHeight;
    console.log("inner height on resize", this.innerHeight);
  }

  
 
  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    console.log("inner height", this.innerHeight);
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