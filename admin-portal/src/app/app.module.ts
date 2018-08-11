import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatGridListModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {MatToolbarModule, MatInputModule, MatSlideToggleModule, MatListModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import 'hammerjs';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import { FirebaseApp } from '@firebase/app-types';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseDatabase } from '@firebase/database-types';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { FirebaseFirestore } from '@firebase/firestore-types';

// service
import {LoginService} from './services/login.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import {AddBookService} from './services/add-book.service';
import {GetBookListService} from './services/get-book-list.service';
import {GetBookService} from './services/get-book.service';
import {UploadImageService} from './services/upload-image.service';
import { BookListComponent, DialogResultExampleDialog } from './components/book-list/book-list.component';
import {Book} from './models/Book';
import { ViewBookComponent } from './components/view-book/view-book.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import { CustomImgDirective } from './custom-img.directive';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import {EditBookService} from './services/edit-book.service';
import {RemoveBookService} from './services/remove-book.service';
import { InputFieldDirective } from './directives/input-field.directive';





const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'addNewBook', component: AddNewBookComponent},
  {path: 'bookList', component: BookListComponent},
  {path: 'viewBook/:id', component: ViewBookComponent},
  {path: 'editBook/:id', component: EditBookComponent}
];
export const firebaseConfig = {
  piKey: 'AIzaSyDrtPs06b7XBnNUtb_k3hiO9su0fYOcvW4',
  authDomain: 'image-cloud-f9417.firebaseapp.com',
  databaseURL: 'https://image-cloud-f9417.firebaseio.com',
  projectId: 'image-cloud-f9417',
  storageBucket: 'image-cloud-f9417.appspot.com',
  messagingSenderId: '506317240725'
};
firebase.initializeApp(firebaseConfig);



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    DashboardComponent,
    AddNewBookComponent,
    BookListComponent,
    ViewBookComponent,
    CustomImgDirective,
    EditBookComponent,
    DialogResultExampleDialog,
    InputFieldDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    MatDialogModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    LoginService,
    FlashMessagesService,
    AddBookService,
    UploadImageService,
    GetBookListService,
    GetBookService,
    AngularFireAuth,
    EditBookService,
    RemoveBookService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent, DialogResultExampleDialog] // seem to be redundant but must add for dialog to show up
})
export class AppModule { }
