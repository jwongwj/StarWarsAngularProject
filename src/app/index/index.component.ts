import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  arr = [];
  list = [];
  currentPage:number;
  totalPages:number;
  property:string;
  isOpened:boolean=false;

  constructor(private data: ApiService, private msg: MessageService, private spinner:NgxSpinnerService) { 
    const index = this.data.getIndex().subscribe(value => {
      this.arr = Object.keys(value);
      index.unsubscribe();
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }
  
  loadList(property) {
    if(property!=this.property){
      this.isOpened=true;
      this.property=property;
      this.list=[];
      this.currentPage=1;
      this.totalPages=undefined;
      this.getList(property)
    }else{
      if(this.isOpened){
        this.isOpened=false;
      }else{
        this.isOpened=true;
      }
    }
  }

  nextClick(property){
    if(this.currentPage<this.totalPages){
      this.currentPage++;
    }
    this.getList(property)
  }
  
  prevClick(property){
    if(this.currentPage>1){
      this.currentPage--;
    }
    this.getList(property)
  }

  getList(property){
    this.spinner.show();
    const list = this.data.getList(property,this.currentPage).subscribe(value=>{
      let items= value['results'];
      let arr=[];
      for(let item of items){
        if(item['name']!=null || item['name']!=undefined){
          arr.push(item['name']);
        }else{
          arr.push(item['title']);
        }
      }
      this.list=arr;
      if(this.totalPages==undefined){
        this.totalPages=Math.ceil(value["count"]/10);
      }
      this.msg.setApiVariables(property, this.currentPage);
      list.unsubscribe()
      this.spinner.hide();
    })
  }

  setDetails(value: String){
    this.msg.setURLValue(value);
    this.msg.getURL();
  }
}
