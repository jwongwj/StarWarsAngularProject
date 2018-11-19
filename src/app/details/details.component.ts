import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../api.service';
import { DetailsInfoModel, ImageDetailsModel } from '../StarwarsModel';
import * as StringUtils from '../stringutils';
import { BaseComponent } from '../base.component';
import { NgNavigatorShareService } from 'ng-navigator-share';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseComponent implements OnInit {

  constructor(private msgSvc: MessageService, private data: ApiService, private spinner: NgxSpinnerService, private ngNavShareService : NgNavigatorShareService) { 
    super(); 
    this.ngNavigatorShareService = ngNavShareService;
  }
  arraySingle: any[] = [];
  arrayArray: any[] = [];
  imgSrc: string;
  editInfo: boolean;
  buttonName: string;
  infoDetails: string = "";
  ngNavigatorShareService: NgNavigatorShareService;

  ngOnInit() {
    this.getNewDetails(this.msgSvc.getURL());
  }

  /**
   * Method to load Details
   */
  getNewDetails(url: string) {
    this.spinner.show();
    this.msgSvc.setURL(url);
    this.resetShowDetails();
    this.imgSrc = this.msgSvc.getImgSrc(url);
    if(localStorage.getItem(url) != null){
      this.createComponent(JSON.parse(localStorage.getItem(url)), false)
    }else{
      const sub = this.data.getURL(url).subscribe(jsonResults => {
        sub.unsubscribe();
        this.createComponent(jsonResults, true);
        localStorage.setItem(url, JSON.stringify(jsonResults));
      }, error => {
        console.log(error);
        this.spinner.hide();
      })
    }
    this.spinner.hide();
  }

  createComponent(jsonResults, newItem: boolean){
    var b = (newItem) ? Object.entries(jsonResults) : jsonResults;
    for (var item of b) {
      let jsonKey = item[0].split('_').join(' ');
      let jsonValue = item[1];
      let checkJsonKey = jsonKey.toLocaleLowerCase().trim();
      let arraysToAdd = [], imageDetailsArray = [];
      if (!Array.isArray(jsonValue)) {
        if (!this.isValidURL(jsonValue) && checkJsonKey != StringUtils.STRING_CREATED && checkJsonKey != StringUtils.STRING_EDITED) {
          // Do not display Date Created / Edited, details here are displayed as labels
          this.arraySingle.push(this.mapDetailsInfoModel(jsonKey, jsonValue));
        
        } else if (this.isValidURL(jsonValue) && checkJsonKey != StringUtils.STRING_URL && checkJsonKey != StringUtils.STRING_CREATED && checkJsonKey != StringUtils.STRING_EDITED) {
          // Do not display Date Created / Edited / URL, URL must be valid, details here are displayed as images
          imageDetailsArray.push(this.mapImageDetailsModel(jsonValue));
          arraysToAdd.push(jsonKey, imageDetailsArray);
          this.arrayArray.push(arraysToAdd)
        }

      } else if (jsonValue.length > 0) {
        // When jsonValue = [] && has value, we create new array to display the information separately in new Div
        for (let jsonArrayResults of jsonValue) {
          imageDetailsArray.push(this.mapImageDetailsModel(jsonArrayResults));
        }
        arraysToAdd.push(jsonKey, imageDetailsArray);
        this.arrayArray.push(arraysToAdd);
      }
    }
  }

  mapDetailsInfoModel(jsonKey, jsonValue): DetailsInfoModel {
    let info: DetailsInfoModel = {
      key: jsonKey,
      value: jsonValue
    };
    return info;
  }

  mapImageDetailsModel(jsonArrayResults): ImageDetailsModel {
    let imageDetails: ImageDetailsModel = {
      url: jsonArrayResults,
      imgSrc: this.msgSvc.getImgSrc(jsonArrayResults)
    }
    const sub = this.data.getURL(jsonArrayResults).subscribe(value => {
      sub.unsubscribe();
      imageDetails.name = (value['name'] != undefined) ? value['name'] : value['title'];
      imageDetails.newUrl = value['url'];
    }, error => {
      console.log(error);
    })
    return imageDetails;
  }

  // Reset everytime component loads before ngDestroy
  resetShowDetails() {
    this.arraySingle = [];
    this.arrayArray = [];
    this.infoDetails = localStorage.getItem(this.msgSvc.getURL() + "/textbox")
    this.editDetails(true);
  }

  // Page Redirect
  returnToList() {
    this.msgSvc.setIndexPage(true);
    this.msgSvc.setDetailsPage(false);
  }

  // Check URL pattern
  isValidURL(str) {
    var pattern = new RegExp(
      StringUtils.REGEX_PROTOCOL +
      StringUtils.REGEX_AUTHENTICATION +
      StringUtils.REGEX_DOMAIN_NAME +
      StringUtils.REGEX_IP_V4_ADD +
      StringUtils.REGEX_PORT_AND_PATH +
      StringUtils.REGEX_QUERY_STRING +
      StringUtils.REGEX_FRAGMENT_LOCATER, 'i'
    );
    return pattern.test(str);
  }

  editDetails(initialLoad? : boolean){
    if(initialLoad == true){
      this.editInfo = true;
      this.buttonName = "Edit";
    }else{
      this.buttonName = (this.editInfo) ? "Save" : "Edit";
      this.editInfo = this.editInfo != true; // Toggle button
      localStorage.setItem(this.msgSvc.getURL() + "/textbox", this.infoDetails);
    }
  }

  // https://github.com/ShankyTiwari/ng-navigator-share
  // npm install --save ng-navigator-share
  // Only for android
  share() {
    this.ngNavigatorShareService.share({
      title: document.title,
      // text: '',
      url: this.msgSvc.getURL()
    }).then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });
  }
}
