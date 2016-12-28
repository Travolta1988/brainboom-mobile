import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../app/services/apiService';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})

export class Page3 {

  page: string;
  arr: any[];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    apiService: ApiService
  ) {
    this.page = 'Three';

    apiService.getUsers()
      .subscribe(
        people => {this.arr = people.data; },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      )

  }

  showAlert(user){
    let alert = this.alertCtrl.create({
      title: user.name,
      subTitle: '<h2>' + user.email + '</h2>',
      buttons: ['OK']
    });
    alert.present();
  }

  selectUser(event, user){
    this.showAlert(user)
  }

}
