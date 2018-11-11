import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  arr = [];

  constructor(private data : ApiService) { }

  ngOnInit() {
    let index = this.data.getIndex().subscribe(value =>{
      var key;
      for(key in value){
        var str = this.uppercaseFirstLetter(key);
        this.arr.push(str);
      }
      index.unsubscribe();
    })
  }
  
  uppercaseFirstLetter(string) 
  {
    if (typeof string !== 'string') return ''
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  lowercaseFirstLetter(string){
    if (typeof string !== 'string') return ''
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  getValue(property){
    var valueToBePassed = "";
    let index = this.data.getIndex().subscribe(value =>{
      var str = this.lowercaseFirstLetter(property);
      valueToBePassed = value[str];
      console.log(valueToBePassed)
      index.unsubscribe();
    })
  }
}
