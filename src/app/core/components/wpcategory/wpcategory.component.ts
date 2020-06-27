import { Component, OnInit } from '@angular/core';
import { WpfcoreService } from '../../wpfcore.service';

@Component({
  selector: 'app-wpcategory',
  templateUrl: './wpcategory.component.html',
  styleUrls: ['./wpcategory.component.scss']
})
export class WpcategoryComponent implements OnInit {

  categories: any;
  title: string = "Category";
  showcount: boolean = true;
  constructor(private wpcore: WpfcoreService) {

  }
  

  ngOnInit(): void {
    this.categories = this.wpcore.getCategory();
  }

}
