import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  property: string; 
  page: string;
  value: string;
  apiDetails;
  private indexPage: boolean;
  private detailsPage: boolean;

  constructor(private data : ApiService) { }

  getURL(){
    const list = this.data.getDetails(this.property, this.value).subscribe(value=>{
      let items= value['results'][0];
      this.apiDetails = items;
      this.detailsPage = true;
      this.indexPage = false;

      list.unsubscribe()
    })
  }

  setURLValue(value){
    this.value = value;
  }

  setApiVariables(property, page){
    this.property = property;
    this.page = page;
  }

  getIndexPage(){
    return this.indexPage;
  }

  setIndexPage(bool : boolean){
    this.indexPage = bool;
  }

  getDetailsPage(){
    return this.detailsPage
  }

  setDetailsPage(bool : boolean){
    this.detailsPage = bool;
  }
}
