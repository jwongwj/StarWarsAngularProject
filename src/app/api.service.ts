import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SWAPI } from './stringutils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  url:string= URL_SWAPI;
  newUrl: string;
  page: string;
  /**
   * Get all Categories
   * @return HttpClient
   * @throws N/A
   */
  getIndex() {
    return this.http.get(this.url)
  }

   /**
   * Get list of categories selected
   * @param list: category
   * @param page: page number selected
   * @return HttpClient
   * @throws IndexOutOfBoundsException - If page number exceeds max pages
   */
  getList(list:string, page) {
    const params=new HttpParams().set('page',page)
    this.newUrl = `${this.url}${list}`
    this.page = page;
    return this.http.get(`${this.url}${list}/`,{params:params});
  }

  /**
   * Get Details of item selected
   * @param url : json['url'] of results
   * Default values can be retrieved from MessageService 
   * @example getDetails(this.msgSvc.property, this.msgSvc.value) <- Values should be set in getList().subscribe()
   */
  getURL(url){
    return this.http.get(url);
  }
}
