import { Injectable } from '@angular/core';
import {Book} from '../models/Book';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Photo} from '../models/photo';

@Injectable()
export class RemoveBookService {


  constructor(private http: HttpClient, private db: AngularFireDatabase) {
  }
  sendBook(book: Book) {
    // console.log(book.inStockNumber);
    const url = 'http://localhost:8181/book/remove';

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, book.id, {headers: headers});
  }
  onDelete(bookId: number) {
   // this.deleteSingleUrl(bookId.toString());
    const storageRef = firebase.storage().ref('/photos/' + bookId + '.png');
    return storageRef.delete();
  }
  deleteSingleUrl(id: string) {
   // this.db.list('photos').remove();
  }

}
