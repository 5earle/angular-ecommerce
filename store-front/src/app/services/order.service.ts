import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../constants/app-const';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }
  getOrderList() {
    const url = AppConst.serverPath + '/order/getOrderList';
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeader});
  }

}
