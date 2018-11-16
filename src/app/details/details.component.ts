import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../api.service';
import { DetailsInfoModel, ImageDetailsModel } from '../StarwarsModel';
import * as StringUtils from '../stringutils';
import { BaseComponent } from '../base.component';
import { PAGE_DETAILS } from '../pageutils';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseComponent implements OnInit {

  constructor(private msgSvc: MessageService, private data: ApiService, private spinner: NgxSpinnerService) { super(msgSvc); }
  arraySingle: any[] = [];
  arrayArray: any[] = [];
  imgSrc: string;
  viewPage: string = PAGE_DETAILS;

  ngOnInit() {
    this.showDetails();
    this.imgSrc = this.msgSvc.getImgSrc();
  }

  componentName() {
    return PAGE_DETAILS;
  }

  /**
   * Initial Method to load Details Component
   */
  showDetails() {
    this.resetShowDetails();
    const list = this.data.getDetails(this.msgSvc.property, this.msgSvc.value).subscribe(value => {
      list.unsubscribe();
      let jsonResults = value['results'][0];
      this.createComponent(jsonResults);
    }, error => {
      console.log(error);
    })
  }

  /**
   * Subsequent Methods to reload pages for referenced links
   */
  getNewDetails(url: string) {
    this.resetShowDetails();
    this.imgSrc = this.msgSvc.getImgSrc(url);
    const sub = this.data.getURL(url).subscribe(value => {
      sub.unsubscribe();
      let jsonResults = value;
      this.createComponent(jsonResults);
    }, error => {
      console.log(error);
    })
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
  }

  // Page Redirect
  returnToList() {
    // To-Do -> Create page routing PAGE_INDEX == something, return true. 
    // Universal method for all pages - Every page requires abstract method of eg. PAGE_NAME="index"
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

  createComponent(jsonResults) {
    for (var item of Object.entries(jsonResults)) {
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
}
