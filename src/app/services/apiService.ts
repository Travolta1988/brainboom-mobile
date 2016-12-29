import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

import { Constants } from '../constants/constants'

@Injectable()
export class ApiService {
  Constants: any;

  constructor(
    private http: Http,
    Constants: Constants
  ) {

    this.Constants = Constants

  }

  getUsers(){
    return this.http.get(this.Constants.API_DEV_URL + '/users')
      .map(response => response.json());
  }

  getQuestions(group){
    return this.http.get(this.Constants.API_DEV_URL + '/' + group + '/questions')
      .map(response => response.json());
  }

  getAnswers(questionId){
    return this.http.get(this.Constants.API_DEV_URL + '/answers/' + questionId)
  }

  askQuestion(data){
    return this.http.post(this.Constants.API_DEV_URL + '/' + data.group + '/questions', data)
  }

  getCurrentQuestion(questionId){
    return this.http.get(this.Constants.API_DEV_URL + '/' + questionId)
  }

  answerQuestion(data){
    return this.http.post(this.Constants.API_DEV_URL + '/answers/' + data.questionId, data)
  }

  getCurrentUserProfile(){
    return this.http.get(this.Constants.API_DEV_URL + '/api/me');
  }
}
