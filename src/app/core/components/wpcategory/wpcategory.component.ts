import { Component, OnInit, Input } from '@angular/core';
import { WpfcoreService } from '../../wpfcore.service';

@Component({
  selector: 'app-wpcategory',
  templateUrl: './wpcategory.component.html',
  styleUrls: ['./wpcategory.component.scss'],
})
export class WpcategoryComponent implements OnInit {

  categories: any;
  @Input() title: string = "Category";
  @Input() titleclass: string = "block-title";
  @Input() showcount: boolean = true;
  @Input() ulClass: string = "nav flex-column";
  @Input() liClass: string = "nav-item";
  @Input() taxonomy: string = "category";
  constructor(private wpcore: WpfcoreService) {

  }
  

  ngOnInit(): void {
    this.categories = this.wpcore.getCategory(this.taxonomy);
  }

}
