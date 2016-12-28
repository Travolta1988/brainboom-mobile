import { Component } from '@angular/core';
import { ApiService } from '../../app/services/apiService';
import { NavController } from 'ionic-angular';
import { AnswersPage } from './answersPage/answers';
import { AlertController } from 'ionic-angular';
import { Constants } from '../../app/constants/constants'

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
})
export class Page2 {
  selectedGroup: any;
  groups: Array<{groupName: string, title: string}>;
  questions: any;
  currentUser: string;
  studentTypes: any[];

  constructor(
    public navCtrl: NavController,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public Constants: Constants
  ) {

    this.studentTypes = Constants.STUDENT_TYPES;
    this.questions = [];
    this.apiService = apiService;
    this.selectedGroup = 'math';
    this.currentUser = localStorage.getItem('currentUserId');

    this.groups = [
      { groupName: 'math', title: 'Mathematic' },
      { groupName: 'biology', title: 'Biology' },
      { groupName: 'history', title: 'History' },
      { groupName: 'chemistry', title: 'Chemistry' }
    ];

    apiService.getQuestions(this.selectedGroup)
      .subscribe(
        data => {
          this.questions = data.questionsList;
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  groupTapped(event, group) {
    this.apiService.getQuestions(group)
      .subscribe(
        data => { this.questions = data.questionsList; },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  getAnswersForQuestion(e, questionId) {
    this.navCtrl.push(AnswersPage, {
      id: questionId
    });
  }

  addQuestion(){
    let prompt = this.alertCtrl.create({
      title: 'Ask question',
      inputs: [
        {
          name: 'questionText',
          placeholder: 'Text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add question',
          handler: data => {
            // data.userWhoAskedId = this.currentUser;
            // hardcoded 56e93e537a8cf20f009ec4a3
            data.userWhoAskedId = '56e93e537a8cf20f009ec4a3';
            data.groupId = this.selectedGroup;
            data.dateAsked = new Date();

            this.apiService.askQuestion(data)
              .subscribe(
                data => {
                  let question = JSON.parse(data['_body']).question;
                  this.questions.push(question);
                },
                error => console.error('Error: ' + error),
                () => console.log('Completed!')
              );
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  filterStudentsType(type){
    let studType = this.studentTypes.find((item)=>{
      return this.studentTypes[this.studentTypes.indexOf(item)].id === type;
    });
    return studType.name;
  }

}
