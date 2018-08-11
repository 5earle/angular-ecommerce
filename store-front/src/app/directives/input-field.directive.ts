import {Directive, ElementRef, Input} from '@angular/core';
import {element} from 'protractor';
import {BookService} from '../services/book.service';

@Directive({
  selector: '[appInputField]'
})
export class InputFieldDirective {
  @Input() imageId: number;
  private selectedFile: string;

  constructor(public element: ElementRef, private bookService: BookService) {}
  ngOnInit()  {
    this.bookService.getImages(this.imageId).then((url) => {
      this.element.nativeElement.src = url;
    });
  }


}
