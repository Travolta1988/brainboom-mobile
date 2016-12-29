import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../app/services/apiService';
import 'rxjs/add/operator/map';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})

export class Profile {

  currentUser: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    apiService: ApiService
  ) {

    this.currentUser = {};

    apiService.getCurrentUserProfile()
      .subscribe(
        user => {
          console.log(JSON.parse(user['_body']));
          this.currentUser = JSON.parse(user['_body']);
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      )

  }

}
