import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  url:string="https://swapi.co/api/";

  getIndex() {
    return this.http.get(this.url);
  }

  getList(list:string, page) {
    const params=new HttpParams().set('page',page)
    return this.http.get(`${this.url}${list}/`,{params:params});
  }

  getDetails(list, details) {
    const params=new HttpParams().set('search',details)
    return this.http.get(`${this.url}${list}/`,{params: params});
  }
}
