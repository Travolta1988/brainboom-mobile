import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthFactory {

  currentUserAuthStatus: boolean;

  constructor() {
    this.currentUserAuthStatus = false;
  }

  setCurrentUserAuthStatus(){
    console.log(123123);
    this.currentUserAuthStatus = true;
  }

  getCurrentUserAuthStatus(){
    return this.currentUserAuthStatus;
  }

}
