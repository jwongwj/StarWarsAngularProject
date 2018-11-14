import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../api.service';
import { StarshipsModel, SpeciesModel, FilmsModel, PeopleModel, VehiclesModel, PlanetsModel } from '../../Model/StarwarsModel';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private msgSvc : MessageService, private data : ApiService, private spinner:NgxSpinnerService) { }
  arr: string[];
  apiDetails;
  model: string;
  starshipsModel: StarshipsModel;
  speciesModel: SpeciesModel;
  peopleModel: PeopleModel;
  arraySingle: any[]=[];
  arrayArray: any[]=[];
  arrayTime: any[]=[];
  itemURL:any;
  imgSrc: string;

  ngOnInit() {
    this.showDetails1();
    this.imgSrc=this.msgSvc.getImgSrc();
    this.generateModel();
  }  

  showDetails(){
    this.spinner.show();
    const list = this.data.getDetails(this.msgSvc.property, this.msgSvc.value).subscribe(value=>{
      this.peopleModel = value['results'][0];
      console.log(value);
      console.log(this.peopleModel);
      console.log(this.peopleModel.gender);
      list.unsubscribe();
      this.spinner.hide();
    },error=>{
      console.log(error);
      this.spinner.hide();
    })
  }

  showDetails1(){
    this.arraySingle=[];
    this.arrayArray=[];
    const list = this.data.getDetails(this.msgSvc.property, this.msgSvc.value).subscribe(value=>{
      list.unsubscribe();
      let array = value['results'][0];
      console.log(array);
      for( var item of Object.entries(array)){
        let key=item[0].split('_').join(' ')
        let value = item[1];
        let lowerkey=key.toLocaleLowerCase().trim()
        if(!Array.isArray(value)){
          if(!this.isValidURL(value)){
            if(lowerkey=="created" || lowerkey=="edited"){
              let object={
                key:key,
                value:value
              }
              this.arrayTime.push(object);
            }else{
              let object={
                key:key,
                value:value
              }
              this.arraySingle.push(object);
            }
          }else{
            if(lowerkey=='url'){
              this.itemURL=value;
            }else{
              let arr=[];
              let arr1=[];
              var obj={
                url:value,
                imgSrc:this.getImgSrc(value)
              }
              arr1.push(obj);
              arr.push(key);
              arr.push(arr1);
              this.arrayArray.push(arr)
            }
          }
        }else{
          let arr=[];
          let arr1=[];
          arr.push(key);
          for(let a of value){
            let obj={
              name:name,
              url:a,
              imgSrc:this.getImgSrc(a)
            }
            arr1.push(obj);
          }
          arr.push(arr1);
          this.arrayArray.push(arr);
        }
      }

      console.log(this.arrayArray)
    },error=>{
      console.log(error);;
    })
  }

  returnToList(){
    this.msgSvc.setIndexPage(true);
    this.msgSvc.setDetailsPage(false);
  }

  generateModel(){
    switch(this.msgSvc.property){
      case "people":{
        break;
      }
      case "people":{
        break;
      }
      case "people":{
        break;
      }
      case "people":{
        break;
      }
      case "people":{
        break;
      }
      case "people":{
        break;
      }
      case "people":{
        break;
      }
    }
  }

  isValidURL(str) {
    var pattern = new RegExp('^((https?:)?\\/\\/)?'+ // protocol
        '(?:\\S+(?::\\S*)?@)?' + // authentication
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
    if (!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
  }

  getImgSrc(url){
    let urlArr=url.split('/');
    var id = urlArr[urlArr.length-2];
    var prop = urlArr[urlArr.length-3];
    if(prop=="people"){
      prop='characters';
    }
    return `https://starwars-visualguide.com/assets/img/${prop}/${id}.jpg`
  }

  getSubHeader(url){
    let fetch=this.data.getURL(url).subscribe(value=>{
      let name=value['name'];
      if(name==undefined){
        name=['title']
      }
      console.log(name)
      fetch.unsubscribe();
      return name;
    })
  }


  // Should I use a general class instead of individual classes - To cater for strings / arrays
  // eg. StringsModel{
  //   image: string; - computed
  //   labelValues : string[]; - from JSON key
  //   extractedValues : string[]; - from JSON values
  // }

  // (if (Array.isArray)) Create new ArrayModel
  // ArrayModel{
  //   iconImages: string[]; - computed
  //   urls: string[]; - from JSON values (if (Array.isArray))
  // }

  // If i do this, then I would need 2 NgFor :
  // a. StringsModel (To show all general strings)
  // b. ArrayModel (Render only if arr.size > 0)

  // Note: If individual class I will need 6 NgIf
}
