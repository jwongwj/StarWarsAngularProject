import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() index:string;
  @Output() selectedItem = new EventEmitter<string>();
  list$:Observable<any[]>

  constructor(private data:ApiService) { }

  ngOnInit() {
  }

  getList(){

  }

}
