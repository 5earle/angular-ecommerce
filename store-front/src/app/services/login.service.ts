import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppConst} from '../constants/app-const';

@Injectable()
export class LoginService {
  private serverPath: string = AppConst.serverPath;
  private isLog: boolean;
  constructor(private http: HttpClient, private router: Router) { }

  sendCredential(username: string, password: string) {
    const url = this.serverPath + '/token';    // backend address
    // creating base64 encoded String from user name and password
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const Header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
    });
    if (this.http.get(url, {headers: Header})) {
      this.setLoggedIn(true);
    }
    return this.http.get(url, {headers: Header});
  }
 /* checkSession() {
    const url = this.serverPath + '/checkSession';
    const headers = new HttpHeaders({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get(url, {headers: headers});
  }
  logout() {
    const url = this.serverPath + '/user/logout';
    const headers = new HttpHeaders({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, '', {headers: headers});
  }*/

  setLoggedIn(value: boolean) {
    this.isLog = value;
  }
  getLoggedIn() {
    return this.isLog;
  }
}
