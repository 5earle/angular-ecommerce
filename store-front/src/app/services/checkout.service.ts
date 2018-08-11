import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserShipping} from '../models/user-shipping';
import {UserBilling} from '../models/user-billing';
import {UserPayment} from '../models/user-payment';
import {AppConst} from '../constants/app-const';
import {ShippingAddress} from '../models/shipping-address';
import {BillingAddress} from '../models/billing-address';
import {Payment} from '../models/payment';

@Injectable()
export class CheckoutService {

  constructor(private http: HttpClient) { }
  checkout(shippingAddress: ShippingAddress,
           billingAddress: BillingAddress,
           payment: Payment,
           shippingMethod: string
  ) {
    const url = AppConst.serverPath + '/checkout/checkout';
    const order = {
      'shippingAddress' : shippingAddress,
      'billingAddress' : billingAddress,
      'payment' : payment,
      'shippingMethod' : shippingMethod
    };
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, order, {headers: tokenHeader});
  }
  getUserOrder() {
    const url = AppConst.serverPath + '/checkout/getUserOrder';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }

}

