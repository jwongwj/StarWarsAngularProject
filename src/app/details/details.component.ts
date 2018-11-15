import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../api.service';
import { DetailsInfoModel, ImageDetailsModel } from '../../Model/StarwarsModel';
import * as Constants from '../constants';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private msgSvc: MessageService, private data: ApiService, private spinner: NgxSpinnerService) { }
  arraySingle: any[] = [];
  arrayArray: any[] = [];
  arrayTime: any[] = []; // to remove ?
  itemURL: any;
  imgSrc: string;

  ngOnInit() {
    this.showDetails();
    this.imgSrc = this.msgSvc.getImgSrc();
  }

  showDetails() {
    this.resetShowDetails();
    const list = this.data.getDetails(this.msgSvc.property, this.msgSvc.value).subscribe(value => {
      list.unsubscribe();
      let jsonResults = value['results'][0];

      for (var item of Object.entries(jsonResults)) {
        let jsonKey = item[0].split('_').join(' ');
        let jsonValue = item[1];
        let checkJsonKey = jsonKey.toLocaleLowerCase().trim();
        let arraysToAdd = [], imageDetailsArray = [];
        
        if (!Array.isArray(jsonValue)) {
          if (!this.isValidURL(jsonValue)) {
            let info = this.mapDetailsInfoModel(jsonKey, jsonValue);
            (checkJsonKey == Constants.STRING_CREATED
              || checkJsonKey == Constants.STRING_EDITED) ? this.arrayTime.push(info) : this.arraySingle.push(info);

          } else {
            if (checkJsonKey == Constants.STRING_URL) {            
              this.itemURL = jsonValue;// to remove ?
            } else {
              imageDetailsArray.push(this.mapImageDetailsModel(jsonValue));
              arraysToAdd.push(jsonKey, imageDetailsArray); 
              this.arrayArray.push(arraysToAdd)
            }
          }
        } else if(jsonValue.length > 0){
          // When jsonValue = [] && has value, we create new array to display the information separately in new Div
            for (let jsonArrayResults of jsonValue) {
              imageDetailsArray.push(this.mapImageDetailsModel(jsonArrayResults));
            }
            arraysToAdd.push(jsonKey, imageDetailsArray);
            this.arrayArray.push(arraysToAdd);
        }
      }
      console.log(this.arrayArray)
    }, error => {
      console.log(error);
    })
  }

  mapDetailsInfoModel(jsonKey, jsonValue) : DetailsInfoModel{
    let info: DetailsInfoModel = {
      key: jsonKey,
      value: jsonValue
    };
    return info;
  }

  mapImageDetailsModel(jsonArrayResults) : ImageDetailsModel{
    let imageDetails: ImageDetailsModel = {
      url: jsonArrayResults,
      imgSrc: this.getImgSrc(jsonArrayResults)
    }
    const sub = this.data.getURL(jsonArrayResults).subscribe(value=>{
      sub.unsubscribe();
      let name = value['name'];
      let url = value['url'];
      if (name==undefined){
        name= value['title'];
      }
      imageDetails.name=name;
      imageDetails.newUrl=url;
    }, error=>{
      console.log(error);
    })
    return imageDetails;
  }

  resetShowDetails() {
    this.arraySingle = [];
    this.arrayArray = [];
  }

  returnToList() {
    // To-Do -> Create page routing PAGE_INDEX == something, return true. 
    // Universal method for all pages - Every page requires abstract method of eg. PAGE_NAME="index"
    this.msgSvc.setIndexPage(true);
    this.msgSvc.setDetailsPage(false);
  }

  isValidURL(str) {
    var pattern = new RegExp(
      '^((https?:)?\\/\\/)?' + // protocol
      '(?:\\S+(?::\\S*)?@)?' + // authentication
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i' // fragment locater
    ); 

    return (!pattern.test(str)) ? false : true;
  }

  getImgSrc(url) {
    let urlArr = url.split('/');
    var id = urlArr[urlArr.length - 2];
    var prop = urlArr[urlArr.length - 3];
   
    if (prop == Constants.STRING_PEOPLE) {
      prop = Constants.STRING_CHARACTERS;
    }
    return `https://starwars-visualguide.com/assets/img/${prop}/${id}.jpg`
  }

  // Need to clean up this as i copy pasted alot
  getNewDetails(url: string){
    this.resetShowDetails();
    this.itemURL = "";
    var data = url.substr(21).slice(0, -1);
    var id = data.split("/");
    if(id[0]=="people"){
      data='characters/' + id[1];
    }
    this.imgSrc = "https://starwars-visualguide.com/assets/img/" + data + ".jpg";
    const sub = this.data.getURL(url).subscribe(value=>{
      sub.unsubscribe();
      let jsonResults = value;

      for (var item of Object.entries(jsonResults)) {
        let jsonKey = item[0].split('_').join(' ');
        let jsonValue = item[1];
        let checkJsonKey = jsonKey.toLocaleLowerCase().trim();
        let arraysToAdd = [], imageDetailsArray = [];
        
        if (!Array.isArray(jsonValue)) {
          if (!this.isValidURL(jsonValue)) {
            let info = this.mapDetailsInfoModel(jsonKey, jsonValue);
            (checkJsonKey == Constants.STRING_CREATED
              || checkJsonKey == Constants.STRING_EDITED) ? this.arrayTime.push(info) : this.arraySingle.push(info);

          } else {
            if (checkJsonKey == Constants.STRING_URL) {            
              this.itemURL = jsonValue;// to remove ?
            } else {
              imageDetailsArray.push(this.mapImageDetailsModel(jsonValue));
              arraysToAdd.push(jsonKey, imageDetailsArray); 
              this.arrayArray.push(arraysToAdd)
            }
          }
        } else if(jsonValue.length > 0){
          // When jsonValue = [] && has value, we create new array to display the information separately in new Div
            for (let jsonArrayResults of jsonValue) {
              imageDetailsArray.push(this.mapImageDetailsModel(jsonArrayResults));
            }
            arraysToAdd.push(jsonKey, imageDetailsArray);
            this.arrayArray.push(arraysToAdd);
        }
      }
    }, error=>{
      console.log(error);
    })
  }
}
