import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Book} from '../models/Book';



@Injectable()
export class AddBookService {

  constructor(
    private http: HttpClient,
  ) { }

  sendBook(book: Book) {
    // console.log(book.inStockNumber);
    const url = 'http://localhost:8181/book/add';

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(book), {headers: headers});
  }

}
