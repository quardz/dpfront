import { Component, OnInit } from '@angular/core';
import { WpfcoreService } from './core/wpfcore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dpfront';
  constructor(private wpcore: WpfcoreService) { 

    console.log(wpcore.getDb());
  }

  OnInit() {
     console.log(this.wpcore.getDb()); 
  }
}
 