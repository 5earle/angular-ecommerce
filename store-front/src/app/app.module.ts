import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material';
import { TabsModule } from 'ngx-bootstrap';
import {MatGridListModule} from '@angular/material';
import {MatListModule} from '@angular/material';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NewUsers} from './models/newUsers';
import {DataFilterPipe} from './components/book-list/data-filter.pipe';
import {DataTableModule} from 'angular2-datatable';

import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AuthGuard} from './guards/auth.guard';


import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {PaymentService} from './services/payment.service';
import {ShippingService} from './services/shipping.service';
import {CartService} from './services/cart.service';
import {OrderService} from './services/order.service';
import {CheckoutService} from './services/checkout.service';

import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from './services/book.service';
import { InputFieldDirective } from './directives/input-field.directive';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderComponent } from './components/order/order.component';



const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'myAccount', component: MyAccountComponent},
  {path: 'myProfile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'bookList', component: BookListComponent, canActivate: [AuthGuard]},
  {path: 'bookDetail/:id', component: BookDetailComponent, canActivate: [AuthGuard]},
  {path: 'shoppingCart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate: [AuthGuard]}
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
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    BookListComponent,
    DataFilterPipe,
    InputFieldDirective,
    BookDetailComponent,
    ShoppingCartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    MatProgressSpinnerModule,
    TabsModule.forRoot(),
    DataTableModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatGridListModule,
    MatListModule
  ],
  providers: [
    LoginService,
    UserService,
    PaymentService,
    ShippingService,
    BookService,
    CartService,
    OrderService,
    CheckoutService,
    AngularFireDatabase,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
