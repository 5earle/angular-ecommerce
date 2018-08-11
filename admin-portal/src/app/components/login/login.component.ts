import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credential = {
    username: '',
    password: ''
  };
  loggedIn: boolean;
  constructor(
    public loginService: LoginService,
    private router: Router,
    private FM: FlashMessagesService) { }

  onSubmit() {
    let qt;
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res => {
        localStorage.setItem('xAuthToken', JSON.stringify(qt));
        this.loginService.setLoggedIn(true);
        /*this.loggedIn = true;
        console.log(this.credential.username + ' ' + this.credential.password);
        console.log('login: ' + this.loginService.getLoggedIn());*/
       // this.FM.show('You are logged in', {cssClass: 'alert-succes', timeout: 4000});
        this.router.navigate(['/bookList']);
      },
      err => {
        this.loginService.setLoggedIn(false);
        console.log(err);
      }
    );
    /*localStorage.setItem('xAuthToken', JSON.stringify(''));
    this.loginService.setLoggedIn(true);
    /!*this.loggedIn = true;
    console.log(this.credential.username + ' ' + this.credential.password);
    console.log('login: ' + this.loginService.getLoggedIn());*!/
    // this.FM.show('You are logged in', {cssClass: 'alert-succes', timeout: 4000});
    this.router.navigate(['/bookList']);*/

  }
  getLoggedIn() {
    return this.loginService.getLoggedIn();
  }

  ngOnInit() {
    /*this.loginService.checkSession().subscribe(
      res => {
        this.loginService.setLoggedIn(true);
      },
      error => {
        this.loginService.setLoggedIn(false);
      }
    );*/
  }

}
