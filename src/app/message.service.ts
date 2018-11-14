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
  id;
  private indexPage: boolean;
  private detailsPage: boolean;

  constructor(private data : ApiService) { }

  getURL(){
    const list = this.data.getDetails(this.property, this.value).subscribe(value=>{
      let items= value['results'][0];
      this.apiDetails = items;
      list.unsubscribe();
    })
  }

  getImgSrc(){
    let prop=this.property.toLowerCase().trim();
    if(prop=="people"){
      prop='characters'
    }
    return `https://starwars-visualguide.com/assets/img/${prop}/${this.id}.jpg`
  }

  setURLValue(value){
    this.value = value;
  }

  setID(id){
    this.id=id;
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
