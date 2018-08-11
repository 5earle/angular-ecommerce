import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';
import * as firebase from 'firebase';
import {Photo} from '../models/photo';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class BookService {
  photoList: AngularFireList<any>;

  constructor(private http: HttpClient,
             /* npm install firebase angularfire2 --save*/
  private db: AngularFireDatabase) {
    this.photoList = this.db.list('photos');
  }

  getBookList() {
    const url = AppConst.serverPath + '/book/bookList';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }
  getBook(id: number) {
    const url = AppConst.serverPath + '/book/' + id;
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }
  searchBook(keyword: string) {
    const url = AppConst.serverPath + '/book/searchBook';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }


  getImages(bookId: number) {
    const storageRef = firebase.storage().ref('/photos/' + bookId + '.png');
    return storageRef.getDownloadURL(); // return the promise // return the promise
  }
  getPhotos() {
    return this.photoList;
  }

}
