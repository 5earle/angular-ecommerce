import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppConst} from '../../constants/app-const';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {NewUsers} from '../../models/NewUsers';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private loginError: boolean;
  private loggedIn = false;
  private credential = {'username': '', 'password': ''};
  private emailSent = false;
  private userNameExists: boolean;
  private username: string;
  private email: string;
  private emailExists = false;
  private emailNotExists = false;
  private forgetPasswordEmailSent = false;
  private recoverEmail: string;
  private dataFetched = true;
  newUser: NewUsers = new NewUsers();

  constructor(private router: Router,
              public loginService: LoginService,
              public userService: UserService) { }

  ngOnInit() {
  }
  onLogin() {
    console.log('login calling');
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res => {
        console.log(res);
        console.log(res as string);
        /*localStorage.setItem('xAuthToken', res as string);*/
        localStorage.setItem('xAuthToken', this.credential.username);
        this.loginService.setLoggedIn(true);
        this.router.navigate(['/home']);
      },
      err => {
        console.log('loggin error');
        this.loggedIn = false;
        this.loginService.setLoggedIn(false);
        this.loginError = true;
        console.log(err);
      }
    );
  }

  onNewAccount() {
    this.userNameExists = false;
    this.emailNotExists = false;
    this.emailSent = false;
    this.dataFetched = false;
    this.userService.newUser(this.username, this.email).subscribe(
      res => {
        this.emailSent = true;
        console.log('good');
      },
      err => {
        if (err.error.text === 'User Added Successfully!') {
          this.emailSent = true;
          this.userNameExists = false;
          this.emailExists = false;
          this.dataFetched = true;
        }
        if (err.error === 'usernameExists') {
          this.userNameExists = true;
          this.dataFetched = true;
        }
        if (err.error === 'emailExists') {
          this.emailExists = true;
          this.dataFetched = true;
        }
      },
      () => {
        console.log('finally');
      }
    );
  }

  onForgetPassword() {
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;
    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        this.forgetPasswordEmailSent = true;
      },
      err => {
        if (err.error === 'Email not found') {
          this.emailNotExists = true;
        }
        if (err.error.text === 'Email sent!') {
          this.forgetPasswordEmailSent = true;
        }
      },
      () => {
        console.log('finally');
      }
    );
  }

}
