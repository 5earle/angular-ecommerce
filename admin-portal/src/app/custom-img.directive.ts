import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appCustomImg]'
})
export class CustomImgDirective {

  constructor(ele: ElementRef) {

  }

}
