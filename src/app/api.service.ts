import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getIndex(){
    return this.http.get('https://swapi.co/api/')
  }

  getList(list){
    return this.http.get('https://swapi.co/api/' + list)
  }

  getDetails(list, details){
    return this.http.get('https://swapi.co/api/' + list + '/' + details)
  }
}
