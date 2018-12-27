import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  isHovering: boolean = false;

  ngOnInit() {
  }

  mouseHovering(){
    this.isHovering = true;
  }

  mouseLeft(){
    this.isHovering = false;
  }

  checkCreditsImg(){
    return !this.isHovering;
  }
}
