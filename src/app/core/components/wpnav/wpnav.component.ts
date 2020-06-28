import { Component, Input } from '@angular/core';
import { RouterModule, Routes,ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wpnav',
  templateUrl: './wpnav.component.html',
  styleUrls: ['./wpnav.component.scss']
})
export class WpnavComponent {

  @Input() node;
  @Input() ulclass: string;
  @Input() liclass: string;
  @Input() l1ulclass: string;
  @Input() l1liclass: string;

  constructor(route:ActivatedRoute, router:Router) { }

}
