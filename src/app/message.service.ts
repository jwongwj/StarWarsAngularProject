import { Injectable } from '@angular/core';
import * as StringUtils from './stringutils';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url: string;
  private indexPage: boolean;
  private detailsPage: boolean;

  constructor() { }

  getURL(){
    return this.url;
  }

  // Get Image based on url path of Starwars API
  getImgSrc(url? :string){
      let urlPath = url.substr(StringUtils.URL_SWAPI.length).slice(0, -1);
      var id = urlPath.split("/");
      if(id[0] == StringUtils.STRING_PEOPLE) urlPath = `${StringUtils.STRING_CHARACTERS}/${id[1]}`;
    return `${StringUtils.URL_STARWARS_VG}${urlPath}.jpg`;
  }

  setURL(url){
    this.url = url;
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
  
  setDetailsURl(property, id){
    this.url = `${StringUtils.URL_SWAPI}${property}/${id}/`
  }

  returnParams(url:string){
    let urlPath = url.substr(StringUtils.URL_SWAPI.length).slice(0, -1);
    var id = urlPath.split("/");
    return id;
  }
}
