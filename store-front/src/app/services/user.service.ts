import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app-const';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NewUsers} from '../models/NewUsers';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

@Injectable()
export class UserService {
  private serverPath: string = AppConst.serverPath;
  constructor(private http: HttpClient) { }

  newUser(username: string, email: string): Observable<any> {
    const url = this.serverPath + '/user/newUser';
    const userInfo = {
      'username' : username,
      'email' : email
    };
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      // 'x-auth-token' : localStorage.getItem('xAuthToken')   this is causing errors
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});
  }

  retrievePassword(email: string) {
    const url = this.serverPath + '/user/forgetPassword';
    const userInfo = {
      'email' : email
    };
    const tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      // 'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, JSON.stringify(userInfo), {headers : tokenHeader});
  }

  updateUserInfo(user: User, newPassword: string, currentPassword: string) {
    const url = this.serverPath + '/user/updateUserInfo';
    const userInfo = {
      'id' : user.id,
      'firstName' : user.firstName,
      'lastName' : user.lastName,
      'username' : user.username,
      'currentPassword' : currentPassword,
      'email' : user.email,
      'newPassword' : newPassword
    };

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers: headers});
  }

  getCurrentUser(email: string) {
    const url = this.serverPath + '/user/getCurrentUser';
    const userInfo = {
      'username' : email
    };
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers : headers});
  }

}
