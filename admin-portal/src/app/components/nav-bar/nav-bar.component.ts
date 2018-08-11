import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogedIn: boolean;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private FM: FlashMessagesService) {}

  ngOnInit() {
    /*this.loginService.checkSession().subscribe(
      res => {
        console.log('Good');
        console.log(res);
        this.isLogedIn = true;
      },
      error => {
        console.log('Bad');
        console.log(error);
        this.isLogedIn = false;
      }
    );*/
    if (localStorage.getItem('xAuthToken') == null) {
      this.loginService.setLoggedIn(false);
    } else {
      this.loginService.setLoggedIn(true);
    }
  }
  onLogout() {
   /* this.loginService.logout().subscribe(
      res => {
        console.log('Good Log Out');
        this.router.navigate(['/login']);
      },
      err => {
        console.log('bad Log Out');
        console.log(err);
      }
    );*/
    localStorage.clear();
    this.loginService.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
  getLoggedIn() {
    return this.loginService.getLoggedIn();
  }

}
