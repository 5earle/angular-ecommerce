import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Photo} from '../models/photo';
// Review this code **********************
@Injectable()
export class UploadImageService {
  filesToUpload: Array<File>;
  selectedFile: File = null;
  photoList: AngularFireList<any>;
  selectPhoto: Photo = new Photo();
  photoValue: Photo;


  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.filesToUpload = [];
    this.photoList = this.db.list('photos');
  }

  /*upload(bookId: number) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, bookId + '.png');  // this.selectedFile.name
    this.http.post('https://us-central1-image-cloud-f9417.cloudfunctions.net/uploadFile', fd)
      .subscribe(res => {
        console.log('uploading');
      });
  }*/
  upload(bookId: number) {
    const metaData = {'contentType': this.selectedFile.type};
    const storageRef = firebase.storage().ref('/photos/' + bookId + '.png');
    const uploadTask = storageRef.put(this.selectedFile, metaData);


    // save link to database
    uploadTask.then((url) => {
      console.log('upload is completed');
      url.ref.getDownloadURL().then((urls) => {
        this.photoValue = new Photo();
        this.photoValue.url = urls;
        this.photoValue.id = bookId.toString();
        this.photoList.push(this.photoValue);
        console.log('key is: ' + this.photoValue.$key);
      });
      /*console.log(firebase.storage().ref('/photos/' + bookId + '.png').getDownloadURL());*/
    });
  }
  fileChangeEvent(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  // spring verion
  uploadToSpring(bookId: number) {
    this.makeFileRequest('http://localhost:8181/book/add/image?id=' + bookId, [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }
  springFileChangeEvent(fileInput: any) {
    console.log(fileInput);
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  // this function is not being used
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('image uploaded successfully!');
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-auth-token', localStorage.getItem('xAuthToken'));
      xhr.send(formData);
    });
  }

}
