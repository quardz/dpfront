import { Component, OnInit, Input } from '@angular/core';
import { WpfcoreService } from '../../wpfcore.service';


@Component({
  selector: 'wparchives',
  templateUrl: './wparchives.component.html',
  styleUrls: ['./wparchives.component.scss']
})
export class WparchivesComponent implements OnInit {
  @Input() title: string = "Archives";
  @Input() titleclass: string = "block-title";
  @Input() showcount: boolean = true;
  @Input() ulClass: string = "nav flex-column";
  @Input() liClass: string = "nav-item";

  archives: any;

  constructor(private wpcore: WpfcoreService) { }

  ngOnInit(): void {
    var _archives = this.wpcore.getArchives();
    console.log("archives loaded", _archives);
    
    if(_archives) {
      this.archives = {};
      var months = ['Jan', 'Feb', 'March', 'April', 'May', "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      for(let _url in _archives) {
        var _mon: any = _url.split('/').pop();
        console.log("mong", _mon);
        if(_mon) {
          _mon = parseInt(_mon);
          var _url2 = "date/" + _url;
          
          this.archives[_url2] = _url.split('/').shift() + " " + months[_mon];
        }
      }
    }    
  }

}
