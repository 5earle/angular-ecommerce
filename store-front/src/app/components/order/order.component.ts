import { Component, OnInit } from '@angular/core';
import {CheckoutService} from '../../services/checkout.service';
import {AppConst} from '../../constants/app-const';
import {Book} from '../../models/book';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';
import {UserPayment} from '../../models/user-payment';
import {UserBilling} from '../../models/user-billing';
import {Order} from '../../models/order';
import {Payment} from '../../models/payment';
import {BillingAddress} from '../../models/billing-address';
import {NavigationExtras, Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {PaymentService} from '../../services/payment.service';
import {ShippingAddress} from '../../models/shipping-address';
import {UserShipping} from '../../models/user-shipping';
import {ShippingService} from '../../services/shipping.service';
// start at 85  --------------------------
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private serverPath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private shippingAddress: ShippingAddress = new ShippingAddress();
  private billingAddress: BillingAddress = new BillingAddress();
  private userPayment: UserPayment = new UserPayment();
  private userShipping: UserShipping = new UserShipping();
  private userBilling: UserBilling = new UserBilling();
  private userShippingList: UserShipping[] = [];
  private userPaymentList: UserPayment[] = [];
  private payment: Payment = new Payment();
  private selectedTab: number;
  private emptyShippingList = true;
  private emptyPaymentList = true;
  private stateList: string[] = [];
  private shippingMethod: string;
  private order: Order = new Order();
  private statOrProv: string;


  constructor(
    private router: Router,
    private cartService: CartService,
    private shippingService: ShippingService,
    private paymentService: PaymentService,
    private checkoutService: CheckoutService
  ) { }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  selectedChange(val: number ) {
    this.selectedTab = val;
  }

  goToPayment() {
    this.selectedTab = 1;
  }

  goToReview() {
    this.selectedTab = 2;
  }
  setStateOrProv() {
    if (this.shippingAddress.shippingAddressCountry === 'CANADA') {
      this.statOrProv = 'Province';
    } else {
      this.statOrProv = 'State';
    }
  }

  getCartItemList() {
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = res as CartItem[];
        this.cartItemNumber = this.cartItemList.length;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  setShippingAddress(userShipping: UserShipping) {
    this.shippingAddress.shippingAddressName = userShipping.userShippingName;
    this.shippingAddress.shippingAddressStreet1 = userShipping.userShippingStreet1;
    this.shippingAddress.shippingAddressStreet2 = userShipping.userShippingStreet2;
    this.shippingAddress.shippingAddressCity = userShipping.userShippingCity;
    this.shippingAddress.shippingAddressState = userShipping.userShippingState;
    this.shippingAddress.shippingAddressCountry = userShipping.userShippingCountry;
    this.shippingAddress.shippingAddressZipcode = userShipping.userShippingZipcode;
    // load the state or province
    if (this.shippingAddress.shippingAddressCountry === 'CANADA') {
      this.stateList = [];
      this.statOrProv = 'Province';
      for (const prov in AppConst.caProvince) {
        if (AppConst.caProvince.hasOwnProperty(prov)) {
          this.stateList.push(prov);
        }
      }
    } else if (this.shippingAddress.shippingAddressCountry === 'USA') {
      this.stateList = [];
      this.statOrProv = 'State';
      for (const states in AppConst.usStates) {
        if (AppConst.usStates.hasOwnProperty(states)) {
          this.stateList.push(states);
        }
      }
    }
  }

  setPaymentMethod(userPayment: UserPayment) {
    this.payment.type = userPayment.type;
    this.payment.cardNumber = userPayment.cardNumber;
    this.payment.expiryMonth = userPayment.expiryMonth;
    this.payment.expiryYear = userPayment.expiryYear;
    this.payment.cvc = userPayment.cvc;
    this.payment.holderName = userPayment.holderName;
    this.payment.defaultPayment = userPayment.defaultPayment;
    this.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
    this.billingAddress.billingAddressStreet1 = userPayment.userBilling.userBillingStreet1;
    this.billingAddress.billingAddressStreet2 = userPayment.userBilling.userBillingStreet2;
    this.billingAddress.billingAddressCity = userPayment.userBilling.userBillingCity;
    this.billingAddress.billingAddressState = userPayment.userBilling.userBillingState;
    this.billingAddress.billingAddressCountry = userPayment.userBilling.userBillingCountry;
    this.billingAddress.billingAddressZipcode = userPayment.userBilling.userBillingZipcode;
  }

  setBillingAsShipping(checked: boolean) {
    console.log('same as shipping');

    if (checked) {
      this.billingAddress.billingAddressName = this.shippingAddress.shippingAddressName;
      this.billingAddress.billingAddressStreet1 = this.shippingAddress.shippingAddressStreet1;
      this.billingAddress.billingAddressStreet2 = this.shippingAddress.shippingAddressStreet2;
      this.billingAddress.billingAddressCity = this.shippingAddress.shippingAddressCity;
      this.billingAddress.billingAddressState = this.shippingAddress.shippingAddressState;
      this.billingAddress.billingAddressCountry = this.shippingAddress.shippingAddressCountry;
      this.billingAddress.billingAddressZipcode = this.shippingAddress.shippingAddressZipcode;
    } else {
      this.billingAddress.billingAddressName = '';
      this.billingAddress.billingAddressStreet1 = '';
      this.billingAddress.billingAddressStreet2 = '';
      this.billingAddress.billingAddressCity = '';
      this.billingAddress.billingAddressState = '';
      this.billingAddress.billingAddressCountry = '';
      this.billingAddress.billingAddressZipcode = '';
    }
  }

  onSubmit() {
    this.checkoutService.checkout(
      this.shippingAddress,
      this.billingAddress,
      this.payment,
      this.shippingMethod
    ).subscribe(
      res => {
        this.order = res as Order;
        console.log(this.order);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            'order': JSON.stringify(this.order)
          }
        };

        this.router.navigate(['/orderSummary'], navigationExtras);
      },
      error => {
        console.log(error.text());
      }
    );
  }

  userBillingContry() {
    console.log(this.userBilling.userBillingCountry);
    if (this.shippingAddress.shippingAddressCountry === 'CANADA') {
      this.stateList = [];
      for (const prov in AppConst.caProvince) {
        if (AppConst.caProvince.hasOwnProperty(prov)) {
          this.stateList.push(prov);
        }
      }
    } else if (this.shippingAddress.shippingAddressCountry === 'USA') {
      this.stateList = [];
      for (const states in AppConst.usStates) {
        if (AppConst.usStates.hasOwnProperty(states)) {
          this.stateList.push(states);
        }
      }
    }
  }

  ngOnInit() {
    this.getCartItemList();


    this.cartService.getShoppingCart().subscribe(
      res => {
        console.log(res);
        this.shoppingCart = res as ShoppingCart;
      },
      error => {
        console.log(error.text());
      }
    );

    this.shippingService.getUserShippingList().subscribe(
      res => {
        console.log(res);
        this.userShippingList = res as UserShipping[];
        if (this.userShippingList.length) {
          this.emptyShippingList = false;

          for (const userShipping of this.userShippingList) {
            if (userShipping.userShippingDefault) {
              this.setShippingAddress(userShipping);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );

    this.paymentService.getUserPaymentList().subscribe(
      res => {
        console.log('***Pyament');
        console.log(res);
        this.userPaymentList = res as UserPayment[];
        this.emptyPaymentList = false;

        if (this.userPaymentList.length) {
          this.emptyPaymentList = false;

          for (const userPayment of this.userPaymentList) {
            if (userPayment.defaultPayment) {
              this.setPaymentMethod(userPayment);
              return;
            }
          }
        }
      },
      error => {
        console.log(error.text());
      }
    );

    /*for (const s in AppConst.usStates) {
      this.stateList.push(s);
    }*/

    this.payment.type = '';
    this.payment.expiryMonth = '';
    this.payment.expiryYear = '';
    this.billingAddress.billingAddressState = '';
    this.shippingAddress.shippingAddressState = '';
    this.shippingMethod = 'groundShipping';
    this.shippingAddress.shippingAddressCountry = '';
  }

}
