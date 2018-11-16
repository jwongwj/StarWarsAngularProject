import { MessageService } from "./message.service";

export abstract class BaseComponent{
  // All class to return name of their page, for rendering the routes
  // We want the URL to be '/', no params
  constructor(msgSvc : MessageService){
    msgSvc.setView(this.viewPage);
  }

  viewPage : string;
}