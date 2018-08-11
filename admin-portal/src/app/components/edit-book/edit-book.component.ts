import { Component, OnInit } from '@angular/core';
import {UploadImageService} from '../../services/upload-image.service';
import {Book} from '../../models/Book';
import {EditBookService} from '../../services/edit-book.service';
import {GetBookService} from '../../services/get-book.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: number;
  book: Book = new Book();
  bookUpdate: boolean;

  constructor(private uploadImg: UploadImageService,
              private editBook: EditBookService,
              private bookList: GetBookService,
              private route: ActivatedRoute,
              private router: Router,
              public FM: FlashMessagesService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });
    this.bookList.getBook(this.bookId).subscribe(
      res => {
        this.book = res as Book;
      },
      err => {
        console.log('fail to get book ' + this.bookId);
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.editBook.sendBook(this.book).subscribe(res => {
      // image editing
      if (this.uploadImg.selectedFile) {
        this.editBook.onEdit(this.bookId).then(() => {
          this.uploadImg.upload(this.bookId);
          console.log('image was removed ');
        }).catch((err) => {
          this.uploadImg.upload(this.bookId);
        });
      }
      // image editing
      this.bookUpdate = true;
      this.FM.show('Book Updated', {cssClass: 'alert-succes', timeout: 4000});
      this.router.navigate(['/bookList']);
    });

  }

}
