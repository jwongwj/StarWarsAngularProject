import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { ListModel } from '../starwarsmodel'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends BaseComponent implements OnInit {

  arr = [];
  list = [];
  currentPage:number;
  totalPages:number;
  property:string;
  isOpened:boolean=false;
  isError:boolean=false;
  arrPage = {};

  constructor(private data: ApiService, private msg: MessageService, private spinner:NgxSpinnerService) { super(); }

  ngOnInit() {
    if(localStorage.getItem(this.data.url) != null){
      this.arr = Object.keys(JSON.parse(localStorage.getItem(this.data.url)));
    }else{
      const index = this.data.getIndex().subscribe(value => {
        this.arr = Object.keys(value);
        localStorage.setItem(this.data.url, JSON.stringify(value));
        index.unsubscribe();
      }, error => {
        console.log(error);
      });      
    }
  }

  loadList(property) {
    if(property!=this.property){
      this.isOpened=true;
      this.property=property;
      this.list=[];
      this.totalPages=undefined;
      this.getList(property, 1)
    }else{
      if(this.isOpened && this.isError){
        let page=this.currentPage||1;
        this.getList(property,page);
      }
      this.isOpened = this.isOpened != true;
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
    this.data.page = page;
    this.isError=false;
    this.data.newUrl=`${this.data.url}${property}`;
    if(localStorage.getItem(this.data.newUrl + '/' + this.data.page) != null){
      var data = JSON.parse(localStorage.getItem(this.data.newUrl + '/' + this.data.page))
      this.list = data;
      if(this.totalPages==undefined){
        this.totalPages = parseInt(localStorage.getItem(`${this.data.newUrl}/${page}` + "page"));
      }
    }else{
      const list = this.data.getList(property,page).subscribe(value=>{
        let arr=[];
        for(let item of value['results']){
          let urlArr = item['url'].split('/');
          var id = urlArr[urlArr.length-2];
          var obj : ListModel = {
            name:(item['name'] != null) ? item['name'] : item['title'],
            id:id,
            url: item['url']
          }
          arr.push(obj);
        }
        this.list=arr;
        localStorage.setItem(`${this.data.newUrl}/${page}`, JSON.stringify(arr))
        if(this.totalPages==undefined){
          this.totalPages=Math.ceil(value["count"]/10);
          localStorage.setItem(`${this.data.newUrl}/${page}` + "page", this.totalPages.toString())
        }
        list.unsubscribe();
      },error=>{
        console.log(error);
        this.isError=true;
        this.currentPage=cPage;
        this.data.page = cPage.toString();
        this.spinner.hide();
      })
    }
    this.spinner.hide();
  }

  setDetails(value){
    this.msg.setURL(value.url);
    this.msg.setDetailsPage(true);
    this.msg.setIndexPage(false);
  }
}
