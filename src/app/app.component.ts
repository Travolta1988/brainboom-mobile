import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthFactory } from '../app/services/authFactory'

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Profile } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  showItem: any;

  pages: Array<{title: string, component: any, showItem: any}>;

  constructor(
    public platform: Platform,
    public authFactory: AuthFactory
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Page1, showItem: true },
      { title: 'Study', component: Page2, showItem: this.showItem },
      { title: 'Users', component: Page3, showItem: this.showItem },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openProfile(){
    this.nav.setRoot(Profile);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
