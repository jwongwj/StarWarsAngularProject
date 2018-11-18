import { Component } from '@angular/core';
import { MessageService } from './message.service';
import * as pages from './pageutils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularProject';

  constructor(private msgSvc : MessageService){
    msgSvc.setIndexPage(true);
  }

  displayIndex(): boolean{
    return this.msgSvc.getIndexPage();
  }

  displayDetails(): boolean{
    return this.msgSvc.getDetailsPage();
  }

  returnToList(){
    this.msgSvc.setIndexPage(true);
    this.msgSvc.setDetailsPage(false);
  }
}

