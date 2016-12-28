import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ApiService } from '../../../app/services/apiService';
import { AlertController } from 'ionic-angular';
import { Constants } from '../../../app/constants/constants'
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-answers',
  templateUrl: 'answers.html'
})

export class AnswersPage {

  answers: any[];
  questionId: string;
  studentTypes: any[];
  currentQuestion: any[];

  constructor(
    public navParams: NavParams,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public Constants: Constants
  ) {
    this.currentQuestion = [];
    this.studentTypes = Constants.STUDENT_TYPES;
    this.answers = [];
    this.questionId = this.navParams.get('id');

    this.apiService.getCurrentQuestion(this.questionId)
      .subscribe(
        data => {
          this.currentQuestion = JSON.parse(data['_body']).questionsList;
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );

    this.apiService.getAnswers(this.questionId)
      .subscribe(
        data => {
          this.answers = JSON.parse(data['_body']);
        },
        error => console.error('Error: ' + error),
        () => console.log('Completed!')
      );
  }

  filterStudentsType(type){
    console.log(type)
    let studType = this.studentTypes.find((item)=>{
      return this.studentTypes[this.studentTypes.indexOf(item)].id === type;
    });
    return studType.name;
  }

  addAnswer(){
    let prompt = this.alertCtrl.create({
      title: 'Answer question',
      inputs: [
        {
          name: 'answerText',
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
            data.questionId = this.questionId;
            data.userWhoAnsweredId = '56e93e537a8cf20f009ec4a3';
            data.dateAnswered = new Date();
            data.groupId = this.currentQuestion[0].groupId;
            data.forQuestionId = this.currentQuestion[0]._id;

            this.apiService.answerQuestion(data)
              .subscribe(
                data => {
                  let answer = JSON.parse(data['_body']).answer;
                  this.answers.push(answer);
                  this.filterStudentsType(answer.userWhoAnsweredId.studentType)
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

}
