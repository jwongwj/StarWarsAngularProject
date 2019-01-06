import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private eRef: ElementRef) { }
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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.isHovering=false;
    if(!this.eRef.nativeElement.contains(event.target)) {
      //click outside
      this.isHovering=false;
    }
  }
}
