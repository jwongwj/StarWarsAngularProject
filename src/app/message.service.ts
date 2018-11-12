import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  property: string; 
  page: string;
  value: string;
  apiDetails: Object;

  constructor(private data : ApiService) { }

  getURL(){
    const list = this.data.getDetails(this.property, this.value).subscribe(value=>{
      let items= value['results'][0];
      this.apiDetails = items;
      console.log(this.apiDetails);
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
}
