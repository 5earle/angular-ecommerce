import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as firebase from 'firebase';


@Injectable()
export class GetBookService {
  selectedFile: string;

  constructor(private http: HttpClient) { }
  getBook(id: number) {
    const url = 'http://localhost:8181/book/' + id;
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }
  getImages(bookId: number) {
    const storageRef = firebase.storage().ref('/photos/' + bookId + '.png');
    return storageRef.getDownloadURL(); // return the promise
  }
 /* getImages(bookId: number) {
    const storage = firebase.storage();
    const storageRef = storage.refFromURL('gs://image-cloud-f9417.appspot.com/' + bookId + '.png');
    storageRef.getDownloadURL().   // returns firebase.Promise containing string
    then((url) =>  {   // lamda
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function (event) {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        console.log(xhr);
    },
      function (err) {  // function
        console.log(err);
      });
  }*/

}
