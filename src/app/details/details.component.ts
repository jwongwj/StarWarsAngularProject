import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private data:ApiService, private msgSvc : MessageService) { }

  ngOnInit() {
    this.msgSvc.getURL();
  }  

  getUrl(){
    console.log(this.msgSvc.apiDetails)
  }
}
