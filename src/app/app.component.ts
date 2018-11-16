import { Component } from '@angular/core';
import { MessageService } from './message.service';

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

  // constructor(private msgSvc : MessageService){
  //   msgSvc.setView(pages.PAGE_INDEX);
  // }

  // displayIndex(): boolean{
  //   return pages.PAGE_INDEX == this.msgSvc.getView();
  // }

  // displayDetails(): boolean{
  //   return pages.PAGE_DETAILS == this.msgSvc.getView();
  // }

  // returnToList(){
  //   this.msgSvc.setView(pages.PAGE_INDEX);
  // }
}

