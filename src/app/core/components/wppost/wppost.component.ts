import { Component, OnInit, Input } from '@angular/core';
import { WpfcoreService } from '../../wpfcore.service';
import { Excerpt } from '../../excerpt.filter.pipe';

@Component({
  selector: 'wppost',
  templateUrl: './wppost.component.html',
  styleUrls: ['./wppost.component.scss']
})
export class WppostComponent implements OnInit {

  content: any;
  pkindex: any;
  data: any;


  @Input() footer: boolean = true;
  @Input() link_title: string = "0";
  @Input() entity_id: number;
  @Input() excerpt: string = '';
  constructor(private wpcore: WpfcoreService) {
    
    
  }
  
 
  ngOnInit(): void {
    this.content = this.wpcore.getEntityByID("posts", this.entity_id);
  }

}
