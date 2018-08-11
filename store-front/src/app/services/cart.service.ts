import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';

@Injectable()
export class CartService {

  constructor(private http: HttpClient) { }

  addItem(id: number, qty: number) {
    const url = AppConst.serverPath + '/cart/add';
    const cartItemInfo = {
      'bookId': id,
      'qty': qty
    };
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, cartItemInfo, {headers: tokenHeader});
  }
  getCartItemList() {
    const url = AppConst.serverPath + '/cart/getCartItemList';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }
  getShoppingCart() {
    const url = AppConst.serverPath + '/cart/getShoppingCart';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }
  updateCartItem(cartItemId: number, qty: number) {
    const url = AppConst.serverPath + '/cart/updateCartItem';
    const cartItemInfo = {
      'cartItemId': cartItemId,
      'qty': qty
    };
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, cartItemInfo, {headers: tokenHeader});
  }
  removeCartItem(id: number) {
    const url = AppConst.serverPath + '/cart/removeItem';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, id, {headers: tokenHeader});
  }

}
