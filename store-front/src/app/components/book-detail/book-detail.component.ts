import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service';
import {CartService} from '../../services/cart.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  private bookId: number;
  private book: Book = new Book();
  private serverPath = AppConst.serverPath;
  private numberList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private qty: number;

  private addBookSuccess = false;
  private notEnoughStock = false;

  private selectedFile: string;

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    /*this.bookId = this.route.snapshot.params['id'];*/
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });
    this.bookService.getBook(this.bookId).subscribe(
      res => {
        console.log(res);
        this.book = res as Book;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complete load book details');
        this.bookService.getImages(this.bookId).then((url) => {
          this.selectedFile = url;
        });
      }
    );
    this.qty = 1;
  }
  onAddToCart() {
    this.cartService.addItem(this.bookId, this.qty).subscribe(
      res => {
        console.log('book was added');
        console.log(res);
        this.addBookSuccess = true;
      },
      err => {
        console.log('book was not added');
        console.log(err);
        this.notEnoughStock = true;
      },
      () => {
        console.log('complete book details');
      }
    );
  }

}
