import { Component, OnInit, Directive } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {GetBookService} from '../../services/get-book.service';
import {Book} from '../../models/Book';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  private book: Book = new Book();
  private bookId: number;
  selectedFile: string;

  constructor(public route: ActivatedRoute, public bookList: GetBookService, private router: Router) { }

  ngOnInit() {
    // get the incoming book details when book is selected from book-list
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
      this.bookList.getBook(this.bookId).subscribe(
        res => {
          this.book = res as Book;
        },
        err => {
          console.log('fail to get book ' + this.bookId);
          console.log(err);
        }
      );
    });
    this.bookList.getImages(this.bookId).then((url) => {
      this.selectedFile = url;
      console.log(this.selectedFile);
    });
  }
  onSelect(book: Book) {
    this.router.navigate(['/editBook', this.bookId]);
  }

}

