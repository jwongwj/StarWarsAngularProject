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

  ngOnInit() {
    this.showDetails();
    this.generateModel();
  }  

  showDetails(){
    this.spinner.show();
    const list = this.data.getDetails(this.msgSvc.property, this.msgSvc.value).subscribe(value=>{
      this.peopleModel = value['results'][0];
      console.log(this.peopleModel.gender)
      list.unsubscribe();
      this.spinner.hide();
    },error=>{
      console.log(error);
      this.spinner.hide();
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
