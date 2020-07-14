import { Component, OnInit } from '@angular/core';
//import { AppComponent } from '../../../app.component';
import { WpfcoreService } from '../../wpfcore.service';


@Component({
  selector: 'app-wpwidgets',
  templateUrl: './wpwidgets.component.html',
  styleUrls: ['./wpwidgets.component.scss']
})
export class WpwidgetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  } 

}


@Component({ 
  selector: 'wp-themeswitch',
  templateUrl: './themeswitch.component.html',
  styleUrls: ['./themeswitch.component.scss']
})
export class WpThemeSwitchComponent implements OnInit {

  themes: any;
  theme: any = 'TwentytwelveComponent';
  theme_display_name: string;

  constructor(
    private wpcore: WpfcoreService
    ) { 
    this.themes = wpcore.getThemes();

    console.log("themes in widgets", this.themes);
  }

  onthemeselect(theme: any) {
    console.log("selected theme in onthemeselect", theme);
    this.wpcore.setTheme(theme);
    this.theme = theme;
  }

  ngOnInit(): void {
  }

}


