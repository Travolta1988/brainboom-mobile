export class Constants{
  API_DEV_URL: string;
  API_URL: string;
  STUDENT_TYPES: any[];

  constructor(){
    this.API_DEV_URL = 'http://localhost:3000';
    this.API_URL = 'http://jsonplaceholder.typicode.com';
    this.STUDENT_TYPES = [
      {id: 0, name: 'Student'},
      {id: 1, name: 'Helper'},
      {id: 2, name: 'Teacher'},
      {id: 3, name: 'Professor'},
      {id: 4, name: 'Guru'},
      {id: 5, name: 'Dovakin'},
    ];
  }
}
