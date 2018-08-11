import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../services/login.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loggedIn: LoginService) {}
  canActivate() {
    // if false we should not see the route
    if (!this.loggedIn.getLoggedIn()) {
      this.router.navigate(['/myAccount']);
      return false;
    } else {
      return true;
    }
  }
}
