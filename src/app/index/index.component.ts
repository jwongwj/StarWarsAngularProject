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
  isError:boolean=false;

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
      this.totalPages=undefined;
      this.getList(property, 1)
    }else{
      if(this.isOpened){
        this.isOpened=false;
      }else{
        this.isOpened=true;
        if(this.isError){
          let page=this.currentPage||1;
          this.getList(property,page);
        }
      }
    }
  }

  nextClick(property){
    let page:number=this.currentPage || 1;
    if(this.currentPage<this.totalPages){
      page++
    }
    this.getList(property, page);
  }
  
  prevClick(property){
    let page:number=this.currentPage || 1;
    if(this.currentPage>1){
      page--
    }
    this.getList(property, page);
  }

  getList(property, page){
    this.spinner.show();
    let cPage=this.currentPage;
    this.currentPage=page;
    const list = this.data.getList(property,page).subscribe(value=>{
      this.isError=false;
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
      list.unsubscribe();
      this.spinner.hide();
    },error=>{
      console.log(error);
      this.isError=true;
      this.currentPage=cPage;
      this.spinner.hide();
    })
  }

  setDetails(value: String){
    this.msg.setURLValue(value);
    this.msg.getURL();
  }
}
