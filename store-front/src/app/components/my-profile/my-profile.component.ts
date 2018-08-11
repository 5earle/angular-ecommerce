import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../constants/app-const';
import {User} from '../../models/user';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {PaymentService} from '../../services/payment.service';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {UserShipping} from '../../models/user-shipping';
import {ShippingService} from '../../services/shipping.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private serverPath: string = AppConst.serverPath;
  private dataFetched = false;
  private loginError: boolean;
  private loggedIn: boolean;
  private credential = {'username': '', 'password': ''};
  private user: User = new User();
  private updateSuccess: boolean;
  private newPassword: string;
  private confirmNewPassword: string;
  private isMatch = false;
  private incorrectPassword: boolean;
  private currentPassword: string;
  private emailNotFound: boolean;
  // ----------------------------------- //
  private selectedProfileTab = 0;
  private selectedBillingTab = 0;
  private selectedShippingTab = 0;
  // ------------------------------ //
  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  private userPaymentList: UserPayment[] = [];
  private defaultPaymentSet: boolean;
  private defaultUserPaymentId: number;
  private stateList: string[] = [];
  private provList: string[] = [];
  private regexx: string;

  private userShipping: UserShipping = new UserShipping();
  private userShippingList: UserShipping[] = [];
  private defaultUserShippingId: number;
  private defaultShippingSet: boolean;


  constructor(private loginService: LoginService,
              private userService: UserService,
              private paymentService: PaymentService,
              private shippingService: ShippingService,
              private router: Router,
              public FMS: FlashMessagesService) { }



  selectedBillingChange(val: number) {
    this.selectedBillingTab = val;
    console.log(this.selectedBillingTab);
  }
  selectedshippingChange(val: number) {
    this.selectedShippingTab = val;
  }
  onUpdateUserInfo () {
    if (this.newPassword !== null && this.currentPassword === undefined) {
      this.incorrectPassword = true;
    } else {
      this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
        res => {
          console.log('update ok');
          this.updateSuccess = true;
        },
        err => {
          const errOne = err.error.text;
          const errTwo = err.error;
          if (errOne === 'Incorrect current password!' || errTwo === 'Incorrect current password!') {
            this.incorrectPassword = true;
          }
          if (errOne === 'Email not found!' || errTwo === 'Email not found!') {
            this.emailNotFound = true;
          }
          if (errOne === 'Update Success' || errTwo === 'Update Success') {
            this.updateSuccess = true;
          }
        }
      );
    }
  }
  getCurrentUser() {
    this.userService.getCurrentUser(localStorage.getItem('xAuthToken')).subscribe(
      res => {
        console.log('inside getting users');
        this.user = res as User;
        // get user detrails from backend and pass it to list
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList;
        this.regexx = '%%%%%567';   // try fixing this later
        console.log(this.userPaymentList);
        // -----------------------------------------------
        for (const index in this.userPaymentList) {
          if (this.userPaymentList[index].defaultPayment) {
            this.defaultUserPaymentId = this.userPaymentList[index].id;
            break;
          }
        }
        for (const index in this.userShippingList) {
          if (this.userShippingList[index].userShippingDefault) {
            this.defaultUserShippingId = this.userShippingList[index].id;
            break;
          }
        }
        this.dataFetched = true;

      },
      err => {
        console.log(err);
      },
      () => {
        console.log('result is: ' + this.dataFetched);
      }
    );
  }
  checkIfPassMatch() {
    if (this.newPassword  === null) {
      this.isMatch = false;
    } else if (this.newPassword !== null && this.newPassword !== this.confirmNewPassword) {
      this.isMatch = true;
    } else {
      this.isMatch = false;
    }
    return this.isMatch;
  }
  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res  => {
        console.log('payment good');
        console.log(res);
        this.getCurrentUser();
        this.selectedBillingTab = 0;
        this.userPayment = new UserPayment();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('final');
      }
    );
  }
  onRemovePayment(id: number) {
    this.paymentService.removePayment(id).subscribe(
      res => {
        console.log('remove ok');
        console.log(res);
        this.getCurrentUser();
      },
      err => {
        console.log('remove failed');
        console.log(err);
      },
      () => {
        console.log('finish');
      }
    );
  }
  setDefaultPayment() {
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        console.log('default set');
        this.getCurrentUser();
        this.FMS.show('Default payment set successfully', {cssClass: 'alert-success', timeout: 4000});
      },
      err => {
        console.log('default not set');
        console.log(err);
      },
      () => {
        console.log('finish');
      }
    );
  }
  onUpdatePayment (payment: UserPayment) {
    this.userPayment = payment;
    this.stateList.push(payment.userBilling.userBillingState);
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  userBillingContry() {
    console.log(this.userBilling.userBillingCountry);
    if (this.userBilling.userBillingCountry === 'CANADA') {
      this.stateList = [];
      for (const prov in AppConst.caProvince) {
        if (AppConst.caProvince.hasOwnProperty(prov)) {
          this.stateList.push(prov);
        }
      }
    } else if (this.userBilling.userBillingCountry === 'USA') {
      this.stateList = [];
      for (const states in AppConst.usStates) {
        if (AppConst.usStates.hasOwnProperty(states)) {
          this.stateList.push(states);
        }
      }
    }
  }
  // ------------------------SHIPPING-------------------------------------- //
  selectedShippingChange(val: number) {
    this.selectedShippingTab = val;
  }
  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedShippingTab = 0;
        this.userShipping = new UserShipping();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complete');
      }
    );
  }
  onUpdateShipping(shipping: UserShipping) {
    this.userShipping = shipping;
    this.stateList.push(shipping.userShippingState);
    this.selectedShippingTab = 1;
  }
  onRemoveShipping(id: number) {
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complete');
      }
    );
  }
  setDefaultShipping() {
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        console.log('shipping default Good');
        this.getCurrentUser();
        this.defaultShippingSet = true;
        this.FMS.show('Default shipping set successfully', {cssClass: 'alert-success', timeout: 4000});
      },
      err => {
        console.log('shipping default err');
        console.log(err);
      },
      () => {
        console.log('complete');
      }
    );
  }
  userShippingContry() {
    console.log(this.userShipping.userShippingCountry);
    if (this.userShipping.userShippingCountry === 'CANADA') {
      this.stateList = [];
      for (const prov in AppConst.caProvince) {
        if (AppConst.caProvince.hasOwnProperty(prov)) {
          this.stateList.push(prov);
        }
      }
    } else if (this.userShipping.userShippingCountry === 'USA') {
      this.stateList = [];
      for (const states in AppConst.usStates) {
        if (AppConst.usStates.hasOwnProperty(states)) {
          this.stateList.push(states);
        }
      }
    }
  }
  ngOnInit() {
    this.getCurrentUser();
    this.userBilling.userBillingCountry = '';
    this.userBilling.userBillingState = '';
    this.userPayment.type = '';
    this.userPayment.expiryMonth = '';
    this.userPayment.expiryYear = '';
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet = false;

    this.userShipping.userShippingState = '';
    this.userShipping.userShippingCountry = '';
    this.userShipping.userShippingState = '';
    this.defaultShippingSet = false;
  }

}
