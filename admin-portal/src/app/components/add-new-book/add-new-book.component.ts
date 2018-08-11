import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/Book';
import {AddBookService} from '../../services/add-book.service';
import {FormsModule} from '@angular/forms';
import {UploadImageService} from '../../services/upload-image.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {
  newBook: Book = new Book();
  imageCap: object;
  book: Book = new Book();
  bookAdded: boolean;

  constructor(public AB: AddBookService, private uploadImageService: UploadImageService) { }

  ngOnInit() {
    this.bookAdded = false;
    this.newBook.active = true;
    this.newBook.category = 'Fiction';
    this.newBook.format = 'Mobile';
    this.newBook.language = 'english';

  }

  onSubmit() {
    this.AB.sendBook(this.newBook).subscribe(
      res => {
        console.log('YUP');
        this.imageCap = res;
        this.book = this.imageCap as Book;
        console.log(this.imageCap);
        console.log(this.book);
        console.log(this.book.id);
       this.uploadImageService.upload(this.book.id);
        this.bookAdded = true;
        this.newBook = new Book();
        this.newBook.active = true;
        this.newBook.category = 'Fiction';
        this.newBook.format = 'Mobile';
        this.newBook.language = 'english';
      },
      err => {
        console.log('adding book error');
        console.log(err);
      }
    );
  }

}
