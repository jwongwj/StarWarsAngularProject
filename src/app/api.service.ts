import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  url:string="https://swapi.co/api/";

  /**
   * Get all Categories
   * @return HttpClient
   * @throws N/A
   */
  getIndex() {
    return this.http.get(this.url);
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
    return this.http.get(`${this.url}${list}/`,{params:params});
  }

  /**
   * Get Details of item selected
   * @param list: from getList()
   * @param details: list['results'][0]
   * Default values can be retrieved from MessageService 
   * @example getDetails(this.msgSvc.property, this.msgSvc.value) <- Values should be set in getList().subscribe()
   */
  getDetails(list, details) {
    const params=new HttpParams().set('search',details)
    return this.http.get(`${this.url}${list}/`,{params: params});
  }

  
  getURL(url){
    return this.http.get(url);
  }
}
