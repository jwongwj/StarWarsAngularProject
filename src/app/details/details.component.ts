import { Component, OnInit, NgZone } from '@angular/core';
import { MessageService } from '../message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../api.service';
import { DetailsInfoModel, ImageDetailsModel } from '../starwarsmodel';
import * as StringUtils from '../stringutils';
import { BaseComponent } from '../base.component';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends BaseComponent implements OnInit {

  constructor(private msgSvc: MessageService, private data: ApiService, public spinner: NgxSpinnerService, private ngNavShareService : NgNavigatorShareService, private _route: ActivatedRoute, private router: Router, private _ngZone:NgZone) { 
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
  innerWidth;
  id;
  property;

  ngOnInit() {
    this.innerWidth=window.innerWidth;
    this.property = this._route.snapshot.params['property'];
    this.id = this._route.snapshot.params['id'];
    this.msgSvc.setDetailsURl(this.property,this.id);
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
    let localstorageresult = localStorage.getItem(url);
    if(localstorageresult != null){
      this.createComponent(JSON.parse(localstorageresult))
      this.spinner.hide();
    }else{
      const sub = this.data.getURL(url).subscribe(jsonResults => {
        sub.unsubscribe();
        this.createComponent(jsonResults);
        localStorage.setItem(url, JSON.stringify(jsonResults));
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      })
    }
  }

  redirectDetails(url:string){
    let property = this.msgSvc.returnParams(url);
    this.router.navigate(['/details', property[0], property[1]]).then(value=>{
      console.log(value);
      this.getNewDetails(url);
    },error=>{
      console.log(error);
    })
  }

  createComponent(jsonResults){
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
    this.router.navigate(['']);
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
      //url: this.msgSvc.getURL()
      url: `${StringUtils.URL_LINK}${this.property}/${this.id}`
    }).then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });
  }
  onResize(event){
    this.innerWidth=event.target.innerWidth; // window width
  }
}
