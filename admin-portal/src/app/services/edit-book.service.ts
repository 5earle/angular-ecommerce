import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../models/Book';
import * as firebase from 'firebase';

@Injectable()
export class EditBookService {

  constructor(private http: HttpClient) { }
  sendBook(book: Book) {
    // console.log(book.inStockNumber);
    const url = 'http://localhost:8181/book/update';

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(book), {headers: headers});
  }
  onEdit(bookId: number) {
    const storageRef = firebase.storage().ref('/photos/' + bookId + '.png');
    return storageRef.delete();
  }


}
