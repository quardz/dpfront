import { Component, Input } from '@angular/core';
import { RouterModule, Routes,ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wpnav',
  templateUrl: './wpnav.component.html',
  styleUrls: ['./wpnav.component.scss']
})
export class WpnavComponent {

  @Input() node;
  @Input() ulClass: string;

  constructor(route:ActivatedRoute, router:Router) { }

}
