import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserPayment} from '../models/user-payment';

@Injectable()
export class PaymentService {
  private serverPath: string = AppConst.serverPath;

  constructor(private http: HttpClient) { }

  newPayment(payment: UserPayment) {
    const url = this.serverPath + '/payment/add';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, JSON.stringify(payment), {headers: tokenHeader});
  }
  getUserPaymentList() {
    const url = this.serverPath + '/payment/getUserPaymentList';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url,  {headers: tokenHeader});
  }
  removePayment(id: number) {
    const url = this.serverPath + '/payment/remove';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, id, {headers: tokenHeader});
  }
  setDefaultPayment (id: number) {
    const url = this.serverPath + '/payment/setDefault';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, id, {headers: tokenHeader});
  }

}
