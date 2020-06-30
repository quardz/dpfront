import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'wpsearchbox',
  templateUrl: './wpsearchbox.component.html',
  styleUrls: ['./wpsearchbox.component.scss']
})
export class WpsearchboxComponent implements OnInit {

  key: string = '';

  constructor(private router: Router) { }
  
  onClickSubmit(formData) {
    if(formData.key) {
      this.key =  formData.key;
      var url = '/search/' + formData.key;
      this.router.routeReuseStrategy.shouldReuseRoute = ( ) => false;
      this.router.navigate([url]);
    }
  }


  ngOnInit(): void {
  }

}
