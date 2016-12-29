import { Component } from '@angular/core';
import {FacebookService, FacebookLoginResponse} from 'ng2-facebook-sdk';

import { AuthFactory } from '../../app/services/authFactory'

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [
    FacebookService
  ]
})
export class Page1 {

  constructor(
    private fb: FacebookService,
    public authFactory:AuthFactory
  ) {}

  login(){
    this.fb.login().then(
      (response: FacebookLoginResponse) => {
        console.log(response);
        this.authFactory.setCurrentUserAuthStatus();
      },
      (error: any) => console.error(error)
    );
  }

}
