import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private isLogedIn: boolean;
  private title: string;
  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('xAuthToken') == null) {
      this.loginService.setLoggedIn(false);
    } else {
      this.loginService.setLoggedIn(true);
    }
  }

  onLogout() {
    localStorage.clear();
    this.loginService.setLoggedIn(false);
    this.router.navigate(['/myAccount']);
  }
  getLoggedIn() {
    return this.loginService.getLoggedIn();
  }


}
