import { Component, OnInit, Input } from '@angular/core';
import { WpfcoreService } from '../../wpfcore.service';


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
  constructor(private wpcore: WpfcoreService) {
    
    
  }
  
 
  ngOnInit(): void {
    this.content = this.wpcore.getEntityByID("posts", this.entity_id);
    console.log("WppostComponent constructor entity id ", this.entity_id);
    console.log("link totle", this.link_title);
  }

}
