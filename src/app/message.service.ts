import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as StringUtils from './stringutils';

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
  private view: string;

  constructor(private data : ApiService) { }

  getURL(){
    const list = this.data.getDetails(this.property, this.value).subscribe(value=>{
      let items= value['results'][0];
      this.apiDetails = items;
      list.unsubscribe();
    })
  }

  // Get Image based on url path of Starwars API
  getImgSrc(url? :string){
    let returnUrl: string = "";
    let urlPath: string = "";
    if(url == null){
      // to get Image on initial load from Index page
      let prop = this.property.toLowerCase().trim();
      if (prop == StringUtils.STRING_PEOPLE) prop = StringUtils.STRING_CHARACTERS;
      urlPath = `${prop}/${this.id}`;

    } else{
      // to get Image on Subsequent loads from referencing Details page
      urlPath = url.substr(StringUtils.URL_SWAPI.length).slice(0, -1);
      var id = urlPath.split("/");
      if(id[0] == StringUtils.STRING_PEOPLE) urlPath = `${StringUtils.STRING_CHARACTERS}/${id[1]}`;
    }

    return `${StringUtils.URL_STARWARS_VG}${urlPath}.jpg`;
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

  getView(){
    return this.view;
  }

  setView(currentPage){
    this.view = currentPage;
  }
}
