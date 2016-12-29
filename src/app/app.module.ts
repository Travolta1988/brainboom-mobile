import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/apiService';
import { AuthFactory } from './services/authFactory';
import { Constants } from './constants/constants';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Profile } from '../pages/profile/profile';
import { AnswersPage } from '../pages/page2/answersPage/answers';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Page3,
    Profile,
    AnswersPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Page3,
    Profile,
    AnswersPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiService, AuthFactory, Constants]
})
export class AppModule {}
