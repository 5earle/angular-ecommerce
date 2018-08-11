import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  isLog: boolean;
  constructor(private http: HttpClient) { }

  sendCredential(username: string, password: string) {
    const url = 'http://localhost:8181/token';    // backend address
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
  checkSession() { // needs work
    const url = 'http://localhost:8181/checkSession';

    const Header = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: Header});
  }
  setLoggedIn(value: boolean) {
    this.isLog = value;
  }
  getLoggedIn() {
    return this.isLog;
  }

  /*logout() {
    const url = 'http://localhost:8181/user/logout';
    const headers = new HttpHeaders({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, '', {headers: headers});
  }*/

}

